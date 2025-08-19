import fs from 'node:fs';

const bigFilePath = "./public/big.txt"
const savePath = "./public/big-copy.txt"

// paso 2: vamos a crear el strempara leer el archivo de big.txt
const source = fs.createReadStream(bigFilePath);

// paso 2 : Vamos a crear , el strem de escritura 
const destination = fs.createWriteStream(savePath);

// ahora los unimos!
source.pipe(destination);


