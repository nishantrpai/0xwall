const babel = require("@babel/core");
import path from "path";
import { promises as fs } from "fs";
const UglifyJS = require("uglify-js");

export default async function handler(req, res) {
  let extensionDirectory = path.join(process.cwd(), "extension");

  const presets = ["@babel/preset-env"];

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
  fileContents = fileContents.replace(":API_URL:", process.env.API_URL);

  const { code: extension } = babel.transform(fileContents, {
    presets,
    plugins,
  });
  let extensionMinify = UglifyJS.minify(extension);
  res.status(200).send(extension);
}
