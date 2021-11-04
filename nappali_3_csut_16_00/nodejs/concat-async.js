const fs = require('fs');
const { promisify } = require('util');

const pReadDir = promisify(fs.readdir);
const pReadFile = promisify(fs.readFile);
const pWriteFile = promisify(fs.writeFile);

/*
await-et (async wait-et) csak async fv-en belül tudunk hívni

async function valami() {
    például itt
}
valami();

De ahelyett, hogy írunk egy fv-t, majd meghívjuk, van egy egyszerűbb mód,
amit úgy hívnak, hogy 
    - Self-Invoking Functions (SIF) 
            vagy
    - Immediately Invoked Function Expressions (IIFE).

Ez az alábbi módon néz ki:

;(async () => {
    fv törzse...
})();

A ; elé csak biztonsági okokból kell, hogy ne legyen syntax error, ill. be kell zárójelezni
magát a fv-t, majd ami úgy kiértékelődik, azt rögtön lehet fv-ként hívni.

Egyébként a pontosvesszőket erősen ajánlott kitenni a kódban, éles fejlesztésnél érdemes
valamilyen lintert is használni.

*/

;(async () => {
    const filenames = await pReadDir('./inputs');
    console.log(filenames);
    let contents = [];
    for (const filename of filenames) {
        contents.push(await pReadFile(`./inputs/${filename}`));
    }
    contents = contents.map(content => content.toString());
    await pWriteFile('./concat-output.txt', contents.join('\n'));
})();
