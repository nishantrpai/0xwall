const { ethers } = require("ethers");

export const verifyTx = async (hash, from, to, price, data) => {
  // TODO: what happens if this API goes down
  const provider = new ethers.providers.EtherscanProvider(
    process.env.CHAIN,
    process.env.ETHERSCAN_KEY
  );
  const tx = await provider.getTransaction(hash);
  price = ethers.BigNumber.from(ethers.utils.formatBytes32String(`${price}`));

  if (tx) {
    let value = ethers.BigNumber.from(
      ethers.utils.formatBytes32String(ethers.utils.formatEther(tx.value))
    );
    if (
      tx.from.toLowerCase() == from.toLowerCase() &&
      tx.to.toLowerCase() == to.toLowerCase() &&
      tx.data == data &&
      value.gte(price)
    ) {
      return true;
    }
  }
  return false;
};

export const verifyTransaction = async (
  source,
  hash,
  from,
  paywall_link_tiers
) => {
  try {
    const provider = new ethers.providers.EtherscanProvider(
      process.env.CHAIN,
      process.env.ETHERSCAN_KEY
    );
    let { type, price, contract_addr, token_balance, domain, writer_account } =
      paywall_link_tiers;

    if (type == "tx") {
      const tx = await provider.getTransaction(hash);

      let value = ethers.BigNumber.from(
        ethers.utils.formatBytes32String(ethers.utils.formatEther(tx.value))
      );
      price = ethers.BigNumber.from(
        ethers.utils.formatBytes32String(`${price}`)
      );

      let checkTx = source == "addTx" ? value.gte(price) : true;
      let data = ethers.utils.formatBytes32String(domain);
      let to = writer_account.toLowerCase();
      if (
        tx.from.toLowerCase() == from.toLowerCase() &&
        tx.to.toLowerCase() == to.toLowerCase() &&
        tx.data == data &&
        checkTx
      ) {
        return true;
      }
      return false;
    }

    if (type == "token") {
      let abi = ["function balanceOf(address) view returns (uint)"];
      let contract = new ethers.Contract(contract_addr, abi, provider);
      let chainbalance = await contract.balanceOf(from);
      // TODO: change to use both big numbers
      chainbalance =
        (ethers.utils.formatUnits(chainbalance, 18) / 1) * 10 ** 18;
      if (chainbalance >= token_balance) {
        return true;
      }
      return false;
    }
  } catch (e) {
    return false;
  }
};

export const fetcher = (url, config = {}) =>
  fetch(url, config).then((res) => res.json());

export const humanizeWallet = (account) => {
  return `${account.substr(0, 5)}...${account.substr(-3)}`;
};

export const connectWallet = (cb) => {
  console.log("click connect wallet");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider.send("eth_requestAccounts", []).then((accounts) => {
    cb(accounts[0]);
  });
};
