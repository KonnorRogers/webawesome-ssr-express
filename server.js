import "./register-components.js";
import express from "express";
const app = express();
const port = 3000;

import * as url from "node:url";
import * as path from "node:path";
import * as fs from "node:fs";
import { renderString } from "@awesome.me/webawesome/dist/ssr/render-string.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.use(express.static("public"));
app.use(
  "/webawesome",
  express.static(
    path.join(__dirname, "node_modules", "@awesome.me", "webawesome"),
  ),
);

app.get("/", (req, res) => {
  // index.html
  const content = fs.readFileSync(path.join(__dirname, "pages", "index.html"), {
    encoding: "utf8",
  });

  // transform with Lit (There are other ways to do this with iterators, this is a simple helper. Refer to: https://lit.dev/docs/ssr/server-usage/)
  const str = renderString(content);
  res.send(str);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
