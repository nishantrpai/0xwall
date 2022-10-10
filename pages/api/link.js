import { createClient } from "@supabase/supabase-js";
const { SUPABASE_URL, SUPABASE_KEY } = process.env;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const getLink = async (req, res) => {
  const { domain } = req.query;

  let { data: links, error } = await supabase
    .from("paywall_writer_links")
    .select(`link, paywall_link_tiers!inner(*)`)
    .eq("paywall_link_tiers.domain", domain);

  links = links.map((link) => {
    return {
      link: link.link,
      tier_id: link.paywall_link_tiers.id,
      type: link.paywall_link_tiers.type,
      price: link.paywall_link_tiers.price,
      contract_addr: link.paywall_link_tiers.contract_addr,
      token_balance: link.paywall_link_tiers.token_balance,
      writer_account: link.paywall_link_tiers.writer_account,
    };
  });

  res.status(200).json({ links, error });
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      break;

    case "GET":
      getLink(req, res);
      break;

    case "PUT":
      break;

    case "DELETE":
      break;
  }
}
