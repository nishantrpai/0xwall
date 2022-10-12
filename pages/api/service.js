import { fetchAccount } from "util/auth";
import { createClient } from "@supabase/supabase-js";
import { verifyTx } from "util/index";
const { SUPABASE_URL, SUPABASE_KEY } = process.env;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const fetchRate = async () => {
  let { data: rateInfo } = await supabase
    .from("paywall_link_price")
    .select(`maintainer_account, price`);
  return rateInfo[0];
};

const fetchAccountInfo = async (writer_account) => {
  if (writer_account) {
    let { data: accountInfo } = await supabase
      .from("paywall_service_tier")
      .select(`service_tier`)
      .eq("writer_account", writer_account);

    accountInfo = accountInfo[0];
    return accountInfo;
  }
  return null;
};

export const fetchServiceStatus = async (req, res) => {
  const token = req?.headers?.authorization;
  let writer_account = await fetchAccount(token);
  writer_account = writer_account.toLowerCase();

  let { count: linksUsed } = await supabase
    .from("paywall_writer_links")
    .select("link", { count: "exact" })
    .eq("writer_account", writer_account);

  let accountInfo = await fetchAccountInfo(writer_account);

  let rate = await fetchRate();

  if (res) res.status(200).json({ linksUsed, accountInfo, rate });

  return { linksUsed, accountInfo };
};

const editServiceStatus = async (req, res) => {
  const token = req?.headers?.authorization;
  let writer_account = await fetchAccount(token);
  writer_account = writer_account.toLowerCase();

  let { linksToBuy, hash } = JSON.parse(req.body);

  writer_account = writer_account.toLowerCase();

  let accountInfo = await fetchAccountInfo(writer_account);

  let rate = await fetchRate();

  let service_tier = accountInfo.service_tier + parseInt(linksToBuy);

  let ethLink = parseFloat(rate.price);
  
  let transacted = await verifyTx(
    hash,
    writer_account,
    rate.maintainer_account,
    parseInt(linksToBuy) * ethLink,
    "0x"
  );

  if (transacted) {
    const { data: txExists } = await supabase
      .from("paywall_service_tier")
      .select("*")
      .match({ tx: hash });
        
    if (!txExists.length) {
      const { error: serviceUpdateError } = await supabase
        .from("paywall_service_tier")
        .update({ service_tier, tx: hash })
        .match({ writer_account });
      
    
      if (!serviceUpdateError) {
        res.status(200).json({ success: true });
      }
    } else {
      res.status(200).json({ success: false, transacted });
    }
  } else {
    res.status(200).json({ success: false, transacted });
  }

};

export default async function handler(req, res) {
  const token = req?.headers?.authorization;
  let writer_account = await fetchAccount(token);

  if (!writer_account) {
    res.status(200).json({ message: "not authenticated" });
  } else {
    switch (req.method) {
      case "GET":
        // get links
        fetchServiceStatus(req, res);
        break;

      case "PUT":
        // edit links
        editServiceStatus(req, res);
        break;
    }
  }
}
