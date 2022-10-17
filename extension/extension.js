(function (window, document, undefined) {

  !function (e, n, t) { function o(e, n) { return typeof e === n } function a() { var e, n, t, a, s, r, f; for (var u in i) if (i.hasOwnProperty(u)) { if (e = [], n = i[u], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++)e.push(n.options.aliases[t].toLowerCase()); for (a = o(n.fn, "function") ? n.fn() : n.fn, s = 0; s < e.length; s++)r = e[s], f = r.split("."), 1 === f.length ? Modernizr[f[0]] = a : (!Modernizr[f[0]] || Modernizr[f[0]] instanceof Boolean || (Modernizr[f[0]] = new Boolean(Modernizr[f[0]])), Modernizr[f[0]][f[1]] = a), l.push((a ? "" : "no-") + f.join("-")) } } function s() { return "function" != typeof n.createElement ? n.createElement(arguments[0]) : u ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments) } var i = [], r = { _version: "3.6.0", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function (e, n) { var t = this; setTimeout(function () { n(t[e]) }, 0) }, addTest: function (e, n, t) { i.push({ name: e, fn: n, options: t }) }, addAsyncTest: function (e) { i.push({ name: null, fn: e }) } }, Modernizr = function () { }; Modernizr.prototype = r, Modernizr = new Modernizr; var l = [], f = n.documentElement, u = "svg" === f.nodeName.toLowerCase(); Modernizr.addTest("adownload", !e.externalHost && "download" in s("a")), a(), delete r.addTest, delete r.addAsyncTest; for (var c = 0; c < Modernizr._q.length; c++)Modernizr._q[c](); e.Modernizr = Modernizr }(window, document);

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
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

  function humanizeWallet(account) {
    return `${account.substr(0, 5)}...${account.substr(-3)}`;
  }

  function getPayWallHTML(
    elementHash,
    price,
    type,
    contract_addr,
    token_balance,
    writer_account,
    domain,
    link
  ) {
    let paywallhtml =
      elementHash == "body" ? paywallElemPage : paywallElemSection;
    let requirement;
    let btnStyle;
    if (type == "tx") {
      requirement = `Unlock requires a transaction of ${price}Ξ to <a href="https://etherscan.io/address/${writer_account}" target="_blank">${humanizeWallet(
        writer_account
      )}</a>`;
      btnStyle = "btn-checkout-tx";
    } else {
      requirement = `&nbsp;Unlocking this page requires ${token_balance} ${parseInt(token_balance) > 1 ? "tokens" : "token"
        } of <a href="https://etherscan.io/token/${contract_addr}" target="_blank">${humanizeWallet(
          contract_addr
        )}</a></span>`;
      btnStyle = "btn-checkout-token";
    }
    paywallhtml = paywallhtml.replaceAll(":btn-style:", btnStyle);
    paywallhtml = paywallhtml.replaceAll(":price:", `Pay ${price}Ξ`);
    paywallhtml = paywallhtml.replaceAll(":txprice:", price);
    paywallhtml = paywallhtml.replaceAll(":requirement:", requirement);
    paywallhtml = paywallhtml.replaceAll(":writer_account:", writer_account);
    paywallhtml = paywallhtml.replaceAll(":domain:", domain);
    paywallhtml = paywallhtml.replaceAll(":api_url:", API_URL);
    paywallhtml = paywallhtml.replaceAll(":link:", encodeURI(link));
    return paywallhtml;
  }

  function paywallElements(elements, domain) {
    elements.forEach((element) => {
      payWalledElement[element.hash] = document.querySelector(
        element.hash
      ).innerHTML;

      setInnerHTML(
        document.querySelector(element.hash),
        getPayWallHTML(
          element.hash,
          element.price,
          element.type,
          element.contract_addr,
          element.token_balance,
          element.writer_account,
          domain,
          element.link
        )
      );
    });
  }

  function showElements(elements, tiers) {
    elements.forEach((element) => {
      if (tiers.includes(element.tier_id)) {
        readerLinks.push(element.link);
        setInnerHTML(document.querySelector(element.hash), payWalledElement[element.hash]);
      }
    });
  }

  function formatURL(url) {
    return url.replace('https://', '').replace('http://', '').replace('www.', '');
  }

  function matchPath(currentLocation, link) {
    let curl = new URL(`https://${formatURL(currentLocation)}`);
    let dblink = new URL(`https://${link}`);
    curl = `${curl.hostname}${curl.pathname}`;
    dblink = `${dblink.hostname}${dblink.pathname}`;
    return curl == dblink;
  }

  function matchHashorSection(currentLocation, link) {
    let curl = new URL(`https://${formatURL(currentLocation)}`);
    let dblink = new URL(`https://${link}`);
    if ((curl.hash == dblink.hash) || document.querySelector(dblink.hash)) {
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
    for (let i = 0; i < allLinks.length; i++) {
      if (matchPath(currentLocation, allLinks[i].link) && !readerLinks.includes(allLinks[i].link)) {
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

  async function getReaderAccount() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0];
  }

  async function runPayWallScript() {
    console.log("check paywall");
    let domain = window.location.hostname.replace('www.', '');
    let links = await fetchLinksFrmDB(domain);
    let { paywall, elements } = checkIfPaywall(window.location.href, links);
    if (paywall) {
      paywallElements(elements, domain);
      if (window.ethereum) {
        let reader_account = await getReaderAccount();
        let tiers = await getTiers(reader_account, domain);
        showElements(elements, tiers);
      }
    }
  }

  function init() {
    let script = document.createElement("script");
    script.src = "https://cdn.ethers.io/lib/ethers-5.2.umd.min.js";
    document.getElementsByTagName("head")[0].appendChild(script);
    script.onload = runPayWallScript();
  }

  if (window.Modernizr.adownload) {
    window.addEventListener("load", (event) => {
      console.log("dom has loaded completely");
      // init();
    });

    window.addEventListener(
      "hashchange",
      async () => {
        console.log("on hash changed");
        await runPayWallScript();
      },
      false
    );

    window.addEventListener('click', () => {
      requestAnimationFrame(async () => {
        if (windowurl !== window.location.href) {
          console.log("url changed");
          windowurl = window.location.href;
          await runPayWallScript();
        }
      });
    }, true);

    document.onreadystatechange = function (e) {
      if (document.readyState === "complete") {
        console.log("dom has been loaded");
        init();
      }
    };
  } else {
    window.location.href = "https://browser-update.org/update-browser.html";
  }

})(window, document);
