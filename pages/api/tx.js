import { createClient } from "@supabase/supabase-js";
import { verifyTransaction } from "util/index";
const { SUPABASE_URL, SUPABASE_KEY } = process.env;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const getTx = async (req, res) => {
  let tier_id = [];
  let author = false;
  let { reader_account, domain, source = "paywall" } = req.query;
  reader_account = reader_account.toLowerCase();
  if (source == "paywall") {
    const { data: txs, error: txsErr } = await supabase
      .from("paywall_reader_tx")
      .select("tx, reader_account, paywall_link_tiers!inner(*)")
      .eq("reader_account", reader_account)
      .eq("paywall_link_tiers.domain", domain);

    for (let i = 0; i < txs.length; i++) {
      tier_id.push(txs[i].paywall_link_tiers.id);
    }

    //check if there are tiers with token type
    const { data: tokenTxs, error } = await supabase
      .from("paywall_link_tiers")
      .select("*")
      .match({ type: "token", domain });

    for (let i = 0; i < tokenTxs.length; i++) {
      let ifTokenExists = await verifyTransaction(
        "verifyToken",
        "",
        reader_account,
        tokenTxs[i]
      );
      if (ifTokenExists) {
        tier_id.push(tokenTxs[i].id);
      }
    }
    // check if there are tiers with erc1155 token type
    const { data: erc1155txs, error: erc1155txsErr } = await supabase
      .from("paywall_reader_erc1155")
      .select("tier_id, paywall_link_tiers!inner(*)")
      .eq("reader_account", reader_account)
      .eq("paywall_link_tiers.domain", domain);

    for (let i = 0; i < erc1155txs.length; i++) {
      tier_id.push(erc1155txs[i].paywall_link_tiers.id);
    }

    let { data: links } = await supabase
      .from("paywall_writer_links")
      .select(`link, paywall_link_tiers!inner(*)`)
      .eq("paywall_link_tiers.domain", domain)
      .eq("paywall_link_tiers.writer_account", reader_account);

    links.length ? (author = true) : (author = false);

    links = links.map((link) => tier_id.push(link.paywall_link_tiers.id));

    tier_id = [...new Set(tier_id)];

    res.status(200).json({ tier_id, author });
  }

  if (source == "dashboard") {
    const { data: purchases = [], error: purchasesErr } = await supabase
      .from("paywall_reader_tx")
      .select(
        `tx, created_at, tier:paywall_link_tiers(domain, links:paywall_writer_links (link))`
      )
      .eq("reader_account", reader_account);
    if (!purchasesErr) res.status(200).json(purchases);
    else res.status(400).json({ error: purchasesErr });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      break;

    case "GET":
      // get tx
      getTx(req, res);
      break;

    case "PUT":
      break;

    case "DELETE":
      break;
  }
}
