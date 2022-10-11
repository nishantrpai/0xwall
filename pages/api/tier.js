import { fetchAccount } from "util/auth";
import { createClient } from "@supabase/supabase-js";
import { validateFormData } from "util/validate";
const { SUPABASE_URL, SUPABASE_KEY } = process.env;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const createAccount = async (writer_account) => {
  await supabase
    .from("paywall_service_tier")
    .insert([{ writer_account, service_tier: 10 }]);
}

const addTier = async (req, res) => {
  const { tier, tiers } = JSON.parse(req.body);

  if (!validateFormData(tier)) {
    res.send(200).json({ success: false, error: 'invalid data' });
  }

  let totalLinks = 0;
  Object.keys(tiers).map((tier) => {
    totalLinks += tiers[tier].links.length;
  });

  totalLinks += tier.links.length;

  let {
    name,
    domain,
    type,
    price,
    contract_addr,
    token_balance,
    links,
    writer_account,
  } = tier;

  const { data: accountInfo } = await supabase
    .from("paywall_service_tier")
    .select("*")
    .eq("writer_account", writer_account);

  if (!accountInfo.length) {
    await createAccount(writer_account);
    accountInfo.push({ writer_account, service_tier: 10 });
  }

  if (totalLinks > accountInfo[0]?.service_tier) {
    res.status(200).json({ success: false, error: "Exhausted total links" });
  } else {
    const { data: linkTiers, error: linkTierError } = await supabase
      .from("paywall_link_tiers")
      .insert([
        {
          writer_account,
          name,
          domain,
          type,
          price,
          contract_addr,
          token_balance,
        },
      ]);

    let tier_links = [];

    for (let i = 0; i < links.length; i++) {
      tier_links.push({
        tier_id: linkTiers[0].id,
        link: links[i],
        writer_account,
      });
    }

    const { data: writerLinks, error: writerError } = await supabase
      .from("paywall_writer_links")
      .insert(tier_links);

    let addError = writerError || linkTierError;

    if (!addError) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false, error: addError });
    }
  }
};

const fetchTiers = async (req, res) => {
  const token = req?.headers?.authorization;
  let writer_account = await fetchAccount(token);

  writer_account = writer_account.toLowerCase();

  let tiers = {};

  let { data: tierLinks = [], error } = await supabase
    .from("paywall_writer_links")
    .select(`link, paywall_link_tiers!inner(*)`)
    .eq("paywall_link_tiers.writer_account", writer_account);

  tierLinks.forEach((tierLink) => {
    if (!tiers[tierLink.paywall_link_tiers.id]) {
      tiers[tierLink.paywall_link_tiers.id] = {};
      tiers[tierLink.paywall_link_tiers.id] = {
        ...tierLink.paywall_link_tiers,
      };
      tiers[tierLink.paywall_link_tiers.id]["links"] = [];
    }
    tiers[tierLink.paywall_link_tiers.id].links.push(tierLink.link);
  });

  res.status(200).json(tiers);
};

const editTier = async (req, res) => {
  let { tier, tiers } = JSON.parse(req.body);
  
  if (!validateFormData(tier)) {
    res.send(200).json({ success: false, error: 'invalid data' });
  }

  let {
    name,
    domain,
    type,
    price,
    contract_addr,
    token_balance,
    id,
    links,
    writer_account,
  } = tier;
  let tier_links = [];

  let totalLinks = 0;
  Object.keys(tiers).map((tier) => {
    totalLinks += tiers[tier].links.length;
  });

  for (let i = 0; i < links.length; i++) {
    tier_links.push({
      tier_id: id,
      link: links[i],
      writer_account,
    });
  }

  const { data: accountInfo } = await supabase
    .from("paywall_service_tier")
    .select("*")
    .eq("writer_account", writer_account);

  if (!accountInfo.length) {
    createAccount(writer_account);
    accountInfo.push({ writer_account, service_tier: 10 });
  }

  if (totalLinks > accountInfo[0]?.service_tier) {
    res.status(200).json({ success: false, error: "Exhausted total links" });
  } else {
    const { error: linkTierError } = await supabase
      .from("paywall_link_tiers")
      .update({ name, domain, type, price, contract_addr, token_balance })
      .match({ id });

    const { error: linkError } = await supabase
      .from("paywall_writer_links")
      .delete()
      .match({ tier_id: id });

    const { error } = await supabase
      .from("paywall_writer_links")
      .upsert(tier_links, { onConflict: "link" });

    let updateError = error || linkError || linkTierError;

    if (!updateError) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false, updateError });
    }
  }
};

const deleteTier = async (req, res) => {
  let { tier } = req.query;

  const { error: readersError } = await supabase
    .from("paywall_reader_tx")
    .delete()
    .eq("tier_id", tier);

  const { error: linkError } = await supabase
    .from("paywall_writer_links")
    .delete()
    .eq("tier_id", tier);

  const { error: writerError } = await supabase
    .from("paywall_link_tiers")
    .delete()
    .eq("id", tier);

  let deleteError = linkError || writerError || readersError;

  if (!deleteError) {
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false, deleteError });
  }
};

export default async function handler(req, res) {
  const token = req?.headers?.authorization;
  let writer_account = await fetchAccount(token);

  if (!writer_account) {
    res.status(200).json({ message: "not authenticated" });
  } else {
    switch (req.method) {
      case "POST":
        // new link
        addTier(req, res);
        break;

      case "GET":
        // get links
        fetchTiers(req, res);
        break;

      case "PUT":
        // edit links
        editTier(req, res);
        break;

      case "DELETE":
        deleteTier(req, res);
        break;
    }
  }
}
