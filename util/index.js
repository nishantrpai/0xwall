const { ethers } = require("ethers");
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export const dateDiff = (timestamp1, timestamp2) => {
  let a = new Date(timestamp1);
  let b = new Date(timestamp2);
  const utc1 = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate());
  const utc2 = Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

export const getTxDate = async (hash) => {
  const provider = new ethers.providers.EtherscanProvider(
    process.env.CHAIN,
    process.env.ETHERSCAN_KEY
  );
  let tx = await provider.getTransaction(hash);
  let block = await provider.getBlock(tx.blockNumber);
  return block.timestamp * 1000;
};

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
  paywall_link_tiers,
  tokenId = ""
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
      let chainbalance = 0;

      let interfaceabi = [
        "function supportsInterface(bytes4 interfaceID) external view returns (bool)",
      ];
      let contract = new ethers.Contract(contract_addr, interfaceabi, provider);
      let isERC1155 = await contract.supportsInterface(0xd9b67a26);

      if (isERC1155) {
        let erc1155abi = [
          "function balanceOf(address _owner, uint256 _id) external view returns (uint256)",
        ];
        let erc1155contract = new ethers.Contract(
          contract_addr,
          erc1155abi,
          provider
        );
        chainbalance = await erc1155contract.balanceOf(from, tokenId);
      } else {
        let erc721abi = ["function balanceOf(address) view returns (uint)"];
        let erc721contract = new ethers.Contract(
          contract_addr,
          erc721abi,
          provider
        );
        chainbalance = await erc721contract.balanceOf(from);
      }

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

export const parseLink = (link) => {
  // remove https:// and http:// and www. from link
  if (!link) return "";
  if (!link.match(/^(http|https):\/\/[^ "]+$/)) return link;
  let parsedLink = link.replace(/(^\w+:|^)\/\//, "");
  parsedLink = parsedLink.replace("www.", "");
  return parsedLink;
};

export const parseDomain = (link) => {
  // if link is valid url
  let parsedLink = link.replace(/(^\w+:|^)\/\//, "");
  parsedLink = parsedLink.replace("www.", "");
  parsedLink = parsedLink.split("/")[0];
  return parsedLink;
};

export const connectWallet = (cb) => {
  console.log("click connect wallet");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider.send("eth_requestAccounts", []).then((accounts) => {
    cb(accounts[0]);
  });
};
