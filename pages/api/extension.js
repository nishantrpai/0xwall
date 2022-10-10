import path from "path";
import { promises as fs } from "fs";
const UglifyJS = require("uglify-js");

export default async function handler(req, res) {
  let extensionDirectory = path.join(process.cwd(), "extension");
  let paywallApp = await fs.readFile(
    extensionDirectory + "/htmls/partials/paywall_head.htm",
    "utf8"
  );
  let paywallSectionHTML = await fs.readFile(
    extensionDirectory + "/htmls/paywall_section.htm",
    "utf8"
  );
  paywallSectionHTML = paywallApp.replaceAll(
    ":paywall_html:",
    paywallSectionHTML
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
  let minify = UglifyJS.minify(fileContents);
  res.status(200).send(minify.code);
}
