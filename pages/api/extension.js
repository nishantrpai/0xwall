import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  let extensionDirectory = path.join(process.cwd(), "extension");

  let extensionScript = await fs.readFile(
    extensionDirectory + "/compiled/paywall.js",
    "utf8"
  );

  res.status(200).send(extensionScript);
}
