(function (window, document, undefined) {

  var tests = [];


  /**
   *
   * ModernizrProto is the constructor for Modernizr
   *
   * @class
   * @access public
   */

  var ModernizrProto = {
    // The current version, dummy
    _version: '3.6.0',

    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config: {
      'classPrefix': '',
      'enableClasses': true,
      'enableJSClass': true,
      'usePrefixes': true
    },

    // Queue of tests
    _q: [],

    // Stub these for people who are listening
    on: function (test, cb) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
      // This is in case people listen to synchronous tests. I would leave it out,
      // but the code to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      var self = this;
      setTimeout(function () {
        cb(self[test]);
      }, 0);
    },

    addTest: function (name, fn, options) {
      tests.push({ name: name, fn: fn, options: options });
    },

    addAsyncTest: function (fn) {
      tests.push({ name: null, fn: fn });
    }
  };



  // Fake some of Object.create so we can force non test results to be non "own" properties.
  var Modernizr = function () { };
  Modernizr.prototype = ModernizrProto;

  // Leak modernizr globally when you `require` it rather than force it here.
  // Overwrite name so constructor name is nicer :D
  Modernizr = new Modernizr();



  var classes = [];


  /**
   * is returns a boolean if the typeof an obj is exactly type.
   *
   * @access private
   * @function is
   * @param {*} obj - A thing we want to check the type of
   * @param {string} type - A string to compare the typeof against
   * @returns {boolean}
   */

  function is(obj, type) {
    return typeof obj === type;
  }
  ;

  /**
   * Run through all tests and detect their support in the current UA.
   *
   * @access private
   */

  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;

    for (var featureIdx in tests) {
      if (tests.hasOwnProperty(featureIdx)) {
        featureNames = [];
        feature = tests[featureIdx];
        // run the test, throw the return value into the Modernizr,
        // then based on that boolean, define an appropriate className
        // and push it into an array of classes we'll join later.
        //
        // If there is no name, it's an 'async' test that is run,
        // but not directly added to the object. That should
        // be done with a post-run addTest call.
        if (feature.name) {
          featureNames.push(feature.name.toLowerCase());

          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
            // Add all the aliases into the names list
            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
            }
          }
        }

        // Run the test, or use the raw value if it's not a function
        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


        // Set each of the names on the Modernizr object
        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
          featureName = featureNames[nameIdx];
          // Support dot properties as sub tests. We don't do checking to make sure
          // that the implied parent tests have been added. You must call them in
          // order (either in the test, or make the parent test a dependency).
          //
          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
          // hashtag famous last words
          featureNameSplit = featureName.split('.');

          if (featureNameSplit.length === 1) {
            Modernizr[featureNameSplit[0]] = result;
          } else {
            // cast to a Boolean, if not one already
            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
            }

            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
          }

          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
        }
      }
    }
  }
  ;
  /*!
  {
    "name": "Event Listener",
    "property": "eventlistener",
    "authors": ["Andrew Betts (@triblondon)"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Registration-interfaces"
    }],
    "polyfills": ["eventlistener"]
  }
  !*/
  /* DOC
  Detects native support for addEventListener
  */

  Modernizr.addTest('eventlistener', 'addEventListener' in window);


  // Run each test
  testRunner();

  delete ModernizrProto.addTest;
  delete ModernizrProto.addAsyncTest;

  // Run the things that are supposed to run after the tests
  for (var i = 0; i < Modernizr._q.length; i++) {
    Modernizr._q[i]();
  }

  // Leak Modernizr namespace
  window.Modernizr = Modernizr;

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

  if (!window.Modernizr.eventlistener) {
    window.location.href = "https://browser-update.org/update-browser.html";
  } else {
    // FETCH ALL LINKS
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
  }

})(window, document);
