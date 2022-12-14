const babel = require("@babel/core");
const path = require("path");
const fs = require("fs").promises;
const UglifyJS = require("uglify-js");
const { loadEnvConfig } = require("@next/env");

loadEnvConfig(process.cwd());

async function compile() {
  console.log("compiling extension script");

  let extensionDirectory = path.join(process.cwd(), "extension");

  const presets = [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: "3.22",
      },
    ],
  ];

  const plugins = [
    "@babel/plugin-transform-async-to-generator",
    "@babel/plugin-transform-template-literals",
  ];

  let unlockScript = await fs.readFile(
    extensionDirectory + "/js/unlock.js",
    "utf8"
  );

  ({ code: unlockScript } = babel.transform(unlockScript, {
    presets,
    plugins,
  }));

  let paywallApp = await fs.readFile(
    extensionDirectory + "/htmls/partials/paywall_head.htm",
    "utf8"
  );

  paywallApp = paywallApp.replaceAll(":unlock_script:", unlockScript);

  let paywallSectionHTML = await fs.readFile(
    extensionDirectory + "/htmls/paywall_section.htm",
    "utf8"
  );

  paywallSectionHTML = paywallApp.replaceAll(
    ":paywall_html:",
    paywallSectionHTML
  );

  paywallSectionHTML = paywallSectionHTML.replaceAll(
    ":unlock_script:",
    unlockScript
  );

  let paywallPageHTML = await fs.readFile(
    extensionDirectory + "/htmls/paywall_page.htm",
    "utf8"
  );

  paywallPageHTML = paywallApp.replaceAll(":paywall_html:", paywallPageHTML);

  let fileContents = await fs.readFile(
    extensionDirectory + "/extension.js",
    "utf8"
  );

  fileContents = fileContents.replace(":paywallelem:", paywallSectionHTML);
  fileContents = fileContents.replace(":paywallpage:", paywallPageHTML);

  fileContents = fileContents.replaceAll(":API_URL:", process.env.API_URL);

  const { code: extension } = babel.transform(fileContents, {
    presets,
    plugins,
  });
  let extensionMinify = UglifyJS.minify(extension);

  fs.writeFile(
    extensionDirectory + "/compiled/paywall.js",
    extensionMinify.code,
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );
  return "built";
}
compile().then(console.log);
