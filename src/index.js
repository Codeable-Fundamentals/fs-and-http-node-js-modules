import http from "node:http";
import fs from "node:fs";
import { documentTypes } from "./utils/mapOfDocumentTypes.js";

const publicDirectory = "./public";

const PORT = 8000;
const server = http.createServer((req, res) => {

  if(req.method!=='GET'){
    res.writeHead(405)
    res.end("Metodo no Valido")
    return
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
    fs.readFile(filepath, (err, content) => {
      if (err) {
        console.log(err);
        res.writeHead(500);
        res.end("internal server error!");
        return
      }

      res.writeHead(200, { "Content-Type": `${contentType ?? "text/html"}` });
      res.end(content);
    });
  }
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
