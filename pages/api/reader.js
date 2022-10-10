import { fetchAccount } from "util/auth";
import { createClient } from "@supabase/supabase-js";
import { verifyTransaction } from "util/index";
const { SUPABASE_URL, SUPABASE_KEY } = process.env;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

const dateDiff = (timestamp1, timestamp2) => {
  let a = new Date(timestamp1);
  let b = new Date(timestamp2);
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

const addReader = async (req, res) => {
  let { reader_account, tx, link, value } = JSON.parse(req.body);
  reader_account = reader_account.toLowerCase();
  let { data: tiers, error: tierErrors } = await supabase
    .from("paywall_writer_links")
    .select("tier_id, writer_account, paywall_link_tiers!inner(*)")
    .eq("link", link);

  let { tier_id, paywall_link_tiers } = tiers[0];
  let from = reader_account; //reader account
  let transacted = await verifyTransaction(
    "addTx",
    tx,
    from,
    paywall_link_tiers
  );
  if (transacted) {
    const { error: dberror } = await supabase
      .from("paywall_reader_tx")
      .insert([{ reader_account, tx, tier_id, value }]);

    if (!dberror) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } else {
    res.status(200).json({ success: false });
  }
};

const getReaders = async (req, res) => {
  const token = req?.headers?.authorization;
  let writer_account = await fetchAccount(token);

  if (writer_account) {
    writer_account = writer_account.toLowerCase();

    let { data: readers } = await supabase
      .from("paywall_reader_tx")
      .select(
        "reader_account, tx, created_at, value, paywall_link_tiers!inner(*)"
      )
      .eq("paywall_link_tiers.writer_account", writer_account);

    let readertxs = {};

    readers.map((reader) => {
      if (!readertxs[reader.paywall_link_tiers.id]) {
        readertxs[reader.paywall_link_tiers.id] = {};
        readertxs[reader.paywall_link_tiers.id].txDates = [
          { name: reader.created_at, value: parseFloat(reader.value) },
        ];
        readertxs[reader.paywall_link_tiers.id].name =
          reader.paywall_link_tiers.name;
        readertxs[reader.paywall_link_tiers.id].domain =
          reader.paywall_link_tiers.domain;
        readertxs[reader.paywall_link_tiers.id].txs = [];
      }

      readertxs[reader.paywall_link_tiers.id].txDates.map((txDate) => {
        if (
          dateDiff(reader.created_at, txDate.name) == 0 &&
          txDate.name !== reader.created_at
        ) {
          txDate.value += parseFloat(reader.value);
        } else {
          readertxs[reader.paywall_link_tiers.id].txDates.push({
            name: reader.created_at,
            value: parseFloat(reader.value),
          });
        }
      });
      readertxs[reader.paywall_link_tiers.id].txs.push({
        account: reader.reader_account,
        tx: reader.tx,
        value: reader.value,
        created_at: reader.created_at,
      });
    });

    readers.map((reader) => {
      readertxs[reader.paywall_link_tiers.id].txDates = [
        ...new Map(
          readertxs[reader.paywall_link_tiers.id].txDates.map((item) => [
            item["name"],
            item,
          ])
        ).values(),
      ];
    });

    readers.map((reader) =>
      readertxs[reader.paywall_link_tiers.id].txDates.sort(
        (txDate1, txDate2) => {
          return (
            Number(new Date(txDate1.name)) - Number(new Date(txDate2.name))
          );
        }
      )
    );

    readers.map((reader) =>
      readertxs[reader.paywall_link_tiers.id].txDates.map(
        (txDate) =>
          (txDate.name = new Date(txDate.name).toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          }))
      )
    );

    res.status(200).json(readertxs);
  } else {
    res.status(200).json({ message: "not authenticated" });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      addReader(req, res);
      break;

    case "GET":
      // get tx
      getReaders(req, res);
      break;

    case "PUT":
      break;

    case "DELETE":
      break;
  }
}
