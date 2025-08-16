import http from "node:http";
import fs from "node:fs";

const PORT = 8000;
const server = http.createServer((req, res) => {
  if (req.url === "/index.html") {
    fs.readFile("./public/index.html", "utf-8", (err, content) => {
      if (err) {
        console.log(err);
        res.writeHead(500);
        res.end("internal server error!");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    });
  } else {
    res.writeHead(404);
    res.end(
      JSON.stringify({
        message: "Wrong path url",
      })
    );
  }
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
