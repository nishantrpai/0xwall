(function (window, document, undefined) {
  const paywallElemSection = `:paywallelem:`;
  const paywallElemPage = `:paywallpage:`;

  const API_URL = `:API_URL:`;

  let windowurl = window.location.href;

  let readerLinks = [];

  let payWalledElement = {};
  async function fetchLinksFrmDB(domain) {
    let response = await fetch(`${API_URL}/api/link?domain=${domain}`);
    let { links } = await response.json();
    return links;
  }

  function setInnerHTML(elm, html) {
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script")).forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value)
      );
      let scriptFragment = document
        .createRange()
        .createContextualFragment(oldScript.innerHTML);
      newScript.appendChild(scriptFragment);
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

  function humanizeWallet(account) {
    return `${account.substr(0, 5)}...${account.substr(-3)}`;
  }

  async function getPayWallHTML(
    elementHash,
    price,
    type,
    contract_addr,
    token_balance,
    writer_account,
    domain,
    link,
    tx_period = "",
    mint_link = ""
  ) {
    let paywallhtml =
      elementHash == "body" ? paywallElemPage : paywallElemSection;
    let requirement;
    let btnStyle;
    let tokenCtr = "erc721-ctr";
    if (type == "tx") {
      requirement = `Unlock requires a transaction of ${price}Ξ ${
        tx_period ? `(valid only for ${tx_period} days)` : ""
      } to <a href="https://etherscan.io/address/${writer_account}" target="_blank">${humanizeWallet(
        writer_account
      )}</a>`;
      btnStyle = "btn-checkout-tx";
    } else {
      let mintLink =
        `https://${mint_link}` ?? `https://etherscan.io/token/${contract_addr}`;
      requirement = `&nbsp;Unlocking this page requires ${token_balance} ${
        parseInt(token_balance) > 1 ? "tokens" : "token"
      } of <a href=${mintLink} target="_blank">${humanizeWallet(
        contract_addr
      )}</a></span>`;

      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        let interfaceabi = [
          "function supportsInterface(bytes4 interfaceID) external view returns (bool)",
        ];
        let contract = new ethers.Contract(
          contract_addr,
          interfaceabi,
          provider
        );
        let isERC1155 = await contract.supportsInterface(0xd9b67a26);
        if (isERC1155) {
          tokenCtr = "erc1155-ctr";
        }
      }
      btnStyle = "btn-checkout-token";
    }
    paywallhtml = paywallhtml.replace(/:btn-style:/g, btnStyle);
    paywallhtml = paywallhtml.replace(/:contract_addr:/g, contract_addr);
    paywallhtml = paywallhtml.replace(/:token_balance:/g, token_balance);
    paywallhtml = paywallhtml.replace(/:token-ctr:/g, tokenCtr);
    paywallhtml = paywallhtml.replace(/:price:/g, `Pay ${price}Ξ`);
    paywallhtml = paywallhtml.replace(/:txprice:/g, price);
    paywallhtml = paywallhtml.replace(/:requirement:/g, requirement);
    paywallhtml = paywallhtml.replace(/:writer_account:/g, writer_account);
    paywallhtml = paywallhtml.replace(/:domain:/g, domain);
    paywallhtml = paywallhtml.replace(/:api_url:/g, API_URL);
    paywallhtml = paywallhtml.replace(/:link:/g, encodeURI(link));
    return paywallhtml;
  }

  function paywallElements(elements, domain) {
    elements.forEach(async (element) => {
      payWalledElement[element.hash] = document.querySelector(
        element.hash
      ).innerHTML;

      let paywalledElement = await getPayWallHTML(
        element.hash,
        element.price,
        element.type,
        element.contract_addr,
        element.token_balance,
        element.writer_account,
        domain,
        element.link,
        element.tx_period,
        element.mint_link
      );

      setInnerHTML(document.querySelector(element.hash), paywalledElement);
    });
  }

  function showElements(elements, tiers) {
    elements.forEach((element) => {
      if (tiers.includes(element.tier_id)) {
        setInnerHTML(
          document.querySelector(element.hash),
          payWalledElement[element.hash]
        );
      }
    });
  }

  function formatURL(url) {
    return url
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "");
  }

  function matchPattern(pattern, path) {
    return new RegExp(pattern).test(path);
  }

  function matchPath(currentLocation, link) {
    let curl = new URL(`https://${formatURL(currentLocation)}`);
    let dblink = new URL(`https://${link}`);
    curl = `${curl.hostname}${curl.pathname}`;
    dblink = `${dblink.hostname}${dblink.pathname}`;
    return curl == dblink || matchPattern(dblink, curl);
  }

  function matchHashorSection(currentLocation, link) {
    let curl = new URL(`https://${formatURL(currentLocation)}`);
    let dblink = new URL(`https://${link}`);
    if (curl.hash == dblink.hash || document.querySelector(dblink.hash)) {
      return true;
    }
    return false;
  }

  function getElement(currentLocation, link) {
    let dblink = new URL(`https://${link}`);
    let element = "body";
    if (dblink.hash)
      element = Boolean(document.querySelector(dblink?.hash))
        ? dblink.hash
        : "body";
    return element;
  }

  function checkIfPaywall(currentLocation, allLinks) {
    let elements = [];
    let paywall = false;
    let curl = new URL(`https://${formatURL(currentLocation)}`);
    curl = `${curl.hostname}${curl.pathname}`;
    for (let i = 0; i < allLinks.length; i++) {
      if (
        matchPath(currentLocation, allLinks[i].link) &&
        !(
          readerLinks.includes(allLinks[i].link) ||
          readerLinks.filter((link) => matchPattern(link, curl)).length
        )
      ) {
        if (matchHashorSection(currentLocation, allLinks[i].link)) {
          paywall = true;
          elements.push({
            hash: getElement(currentLocation, allLinks[i].link),
            link: allLinks[i].link,
            tier_id: allLinks[i].tier_id,
            price: allLinks[i].price,
            type: allLinks[i].type,
            contract_addr: allLinks[i].contract_addr,
            token_balance: allLinks[i].token_balance,
            writer_account: allLinks[i].writer_account,
            tx_period: allLinks[i].tx_period,
            mint_link: allLinks[i].mint_link,
          });
        }
      }
    }
    return { paywall, elements };
  }

  async function getTiers(reader_account, domain) {
    let response = await fetch(
      `${API_URL}/api/tx?reader_account=${reader_account}&domain=${domain}`
    );
    let { tier_id } = await response.json();
    return tier_id;
  }

  async function addReaderLinks(links, tiers) {
    for (let i = 0; i < links.length; i++) {
      if (tiers.includes(links[i].tier_id)) {
        readerLinks.push(links[i].link);
      }
    }
  }

  async function getReaderAccount() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0];
  }

  async function runPayWallScript() {
    console.log("check paywall");
    let domain = window.location.hostname.replace("www.", "");
    let links = await fetchLinksFrmDB(domain);
    let { paywall, elements } = checkIfPaywall(window.location.href, links);
    if (paywall) {
      paywallElements(elements, domain);
      if (window.ethereum) {
        let reader_account = await getReaderAccount();
        let tiers = await getTiers(reader_account, domain);
        addReaderLinks(links, tiers);
        showElements(elements, tiers);
      }
    }
  }

  async function init() {
    if (
      !document.querySelector(
        "script[src='https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.umd.min.js']"
      )
    ) {
      let script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.umd.min.js";
      script.type = "application/javascript";
      script.async = true;
      script.addEventListener("load", async () => {
        await runPayWallScript();
      });
      document.getElementsByTagName("head")[0].appendChild(script);
    } else {
      await runPayWallScript();
    }
  }

  window.addEventListener("load", async (event) => {
    console.log("dom has loaded completely");
    await init();
  });

  window.addEventListener(
    "click",
    () => {
      requestAnimationFrame(async (event) => {
        if (windowurl !== window.location.href) {
          console.log("url changed");
          windowurl = window.location.href;
          await init();
        }
      });
    },
    true
  );
})(window, document);
