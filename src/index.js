import http from "node:http";
import fs from "node:fs";
import { documentTypes } from "./utils/mapOfDocumentTypes.js";

const publicDirectory = "./public";

const PORT = 8000;
// Determinamos el límite para usar streams
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

const server = http.createServer((req, res) => {
  if (req.method !== "GET") {
    res.writeHead(405);
    res.end("Metodo no Valido");
    return;
  }

  let filepath =
    req.url === "/"
      ? `${publicDirectory}/index.html`
      : `${publicDirectory}${req.url}`;

  let pathArr = filepath.split(".");
  let extension = pathArr[pathArr.length - 1];

  let contentType = documentTypes[extension];

  // ¿cual es la extension del archivo?
  if (extension !== "ico") {
    const stream = fs.createReadStream(filepath);

    fs.stat(filepath, (err, stats) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOENT") {
          res.writeHead(404);
          res.end("Not Found");
        } else {
          res.writeHead(500);
          res.end("Server Error");
        }
        return;
      }
    });
    
    stream.on("error", (error) => {
      if (error.code == "ENOENT") {
        res.writeHead(404);
        res.end("Not Found");
        return;
      } else {
        res.writeHead(500);
        res.end("Internal Server Error");
        return;
      }
    });
    res.writeHead(200, { "Content-Type": contentType });
    stream.pipe(res);
  }
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
