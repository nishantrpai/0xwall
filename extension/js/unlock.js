if (!window.ethereum) {
  if (!(window.screen.width <= 768)) {
    document.getElementById("install-mm").innerHTML =
      "Install <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en' target='_blank'> Metamask </a>";
  } else {
    document.getElementById("install-mm").innerHTML =
      'Open in <button class="redirect-metamask" onclick="openMetamaskUrl()"> Metamask Browser </a>';
  }
}

function openMetamaskUrl() {
  let domainRe = new RegExp("http(s)?://");
  let domain = window.location.href.replace(domainRe, "");
  domain = domain.replace("www.", "");
  const a = document.createElement("a");
  a.href = "dapp://" + domain;
  a.target = "_self";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function unlockPayWall() {
  if (document.getElementById("checkout-price").innerText !== "Processing") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const tx = await signer.sendTransaction({
      to: ":writer_account:",
      value: ethers.utils.parseEther(":txprice:"),
      data: ethers.utils.formatBytes32String(":domain:"),
    });

    document.getElementById("checkout-price").innerText = "Processing";
    document.getElementById("install-mm").innerText = "Don't refresh the page";
    document.getElementById("status-svg").innerHTML =
      '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle></svg>';
    const receipt = await tx.wait();
    if (receipt) {
      let addTxResp = await fetch(":api_url:/api/reader", {
        method: "POST",
        body: JSON.stringify({
          reader_account: accounts[0],
          tx: tx.hash,
          value: ":txprice:",
          link: ":link:",
        }),
      });
      let { success } = await addTxResp.json();
      if (success) {
        document.getElementById("checkout-price").remove();
        document.getElementById("status-svg").innerHTML =
          '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        window.location.reload();
      } else {
        document.getElementById("checkout-price").remove();
        document.getElementById("status-svg").innerHTML =
          '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
        window.location.reload();
      }
    }
  }
}

async function verifyTokenId() {
  console.log("verify Token");
  let tokenId = document.getElementById("token-id").value.trim();
  let contract = document.getElementById("token-id").dataset.contract;
  let tokenBalance = document.getElementById("token-id").dataset.balance;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  let reader_account = accounts[0];

  let erc1155abi = [
    "function balanceOf(address _owner, uint256 _id) external view returns (uint256)",
  ];
  let erc1155contract = new ethers.Contract(contract, erc1155abi, provider);
  let chainbalance = await erc1155contract.balanceOf(reader_account, tokenId);
  chainbalance = (ethers.utils.formatUnits(chainbalance, 18) / 1) * 10 ** 18;

  // TODO: change check operation based on backend relation min,gte,eq
  if (chainbalance >= tokenBalance) {
    document.getElementById("erc1155-checkout-btn").innerText = "Verifying...";
    let addTxResp = await fetch(":api_url:/api/reader", {
      method: "POST",
      body: JSON.stringify({
        reader_account,
        type: "erc1155",
        tokenId,
        link: ":link:",
      }),
    });
    let { success } = await addTxResp.json();
    if (success) {
      document.getElementById("erc1155-checkout-btn").innerHTML =
        '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      window.reload();
    } else {
      document.getElementById("erc1155-checkout-btn").innerHTML =
        '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      window.reload();
    }
  } else {
    document.getElementById("install-mm").innerText =
      "Insufficient token balance";
  }
}
