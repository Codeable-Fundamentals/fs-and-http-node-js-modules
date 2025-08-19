import fs from "node:fs";

const publicDirectory = "./public/big-2.txt";

let content = "";

for (let i = 0; i < 1_000_000; i++) {
  content += "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n";
}

fs.writeFile(publicDirectory, content, (err) => {
  if (err) throw err;
});
