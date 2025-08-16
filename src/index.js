import http from "node:http";
import fs from "node:fs";

const publicDirectory = "./public";

const PORT = 8000;
const server = http.createServer((req, res) => {
  let filepath =
    req.url === "/"
      ? `${publicDirectory}/index.html`
      : `${publicDirectory}${req.url}`;

  fs.readFile(filepath, "utf-8", (err, content) => {
    if (err) {
      console.log(err);
      res.writeHead(500);
      res.end("internal server error!");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
