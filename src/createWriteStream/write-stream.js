import fs from "node:fs";

const publicDirectory = "./public/big.txt";

const file = fs.createWriteStream(publicDirectory, "utf8");

for (let i = 0; i < 1_000_000; i++) {
  file.write(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n"
  );
}

file.end();