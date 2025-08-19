import fs from "node:fs";
 
const publicDirectory = "./public/big.txt";

const stream = fs.createReadStream(publicDirectory);
let chunks = 0;
 
stream.on("open", () => console.log("Inicio del stream"));
 
stream.on("data", (chunk) => {
  if (chunks < 5) {
    console.log(chunk);
    chunks += 1;
  }
});
 
stream.on("close", () => {
  console.log("Fin del stream");
});