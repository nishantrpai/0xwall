import { fetchAccount } from "util/auth";
import { createClient } from "@supabase/supabase-js";
import { verifyTransaction, dateDiff } from "util/index";
const { SUPABASE_URL, SUPABASE_KEY } = process.env;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const addTxReader = async (req, res) => {
  let { reader_account, tx, link, value } = JSON.parse(req.body);
  reader_account = reader_account.toLowerCase();
  let { data: tiers, error: tierErrors } = await supabase
    .from("paywall_writer_links")
    .select("tier_id, writer_account, paywall_link_tiers!inner(*)")
    .eq("link", link);

  if (tierErrors) {
    res.status(400).json({ success: false });
  }

  let { tier_id, paywall_link_tiers } = tiers[0];
  let from = reader_account; //reader account
  let transacted = await verifyTransaction(
    "addTx",
    tx,
    from,
    paywall_link_tiers
  );
  if (transacted) {
    let { data: readerTxs } = await supabase
      .from("paywall_reader_tx")
      .select("tier_id, reader_account")
      .eq("reader_account", reader_account)
      .eq("tier_id", tier_id);

    if (readerTxs.length == 0) {
      // add new tx
      const { error } = await supabase
        .from("paywall_reader_tx")
        .insert([{ reader_account, tx, tier_id, value }]);

      if (!error) {
        res.status(200).json({ success: true });
      } else {
        res.status(200).json({ success: false });
      }
    } else {
      // update existing tx
      const { error } = await supabase
        .from("paywall_reader_tx")
        .update({ tx, value })
        .match({ reader_account, tier_id });

      if (!error) {
        res.status(200).json({ success: true });
      } else {
        res.status(200).json({ success: false });
      }
    }
  }
};

const addERC1155Reader = async (req, res) => {
  let { reader_account, link, tokenId } = JSON.parse(req.body);
  reader_account = reader_account.toLowerCase();
  let { data: tiers, error: tierErrors } = await supabase
    .from("paywall_writer_links")
    .select("tier_id, writer_account, paywall_link_tiers!inner(*)")
    .eq("link", link);

  if (tierErrors) {
    res.status(400).json({ success: false });
  }

  let { tier_id, paywall_link_tiers } = tiers[0];
  let owned = await verifyTransaction(
    "verifyToken",
    "",
    reader_account,
    paywall_link_tiers,
    tokenId
  );

  if (owned) {
    let { data: readerERC1155s } = await supabase
      .from("paywall_reader_erc1155")
      .select("tier_id, reader_account")
      .eq("reader_account", reader_account)
      .eq("tier_id", tier_id);

    if (readerERC1155s.length == 0) {
      const { error } = await supabase
        .from("paywall_reader_erc1155")
        .insert([{ reader_account, token_id: tokenId, tier_id }]);
      if (!error) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false });
      }
    } else {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false });
  }
};

const addReader = async (req, res) => {
  let { type = "tx" } = JSON.parse(req.body);
  if (type == "tx") {
    addTxReader(req, res);
  }

  if (type == "erc1155") {
    addERC1155Reader(req, res);
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
          { name: "2022-10-09T15:40:47.876996+00:00", value: 0 },
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
