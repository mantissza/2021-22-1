const fs = require('fs');
//const { promisify } = require('util');

// Ez a kis függvény szemlélteti, hogy kb. mégis mi van a promisify mögött.
// Egy függvényt (fn) kap paraméterül
const promisify2 = (fn) => {
    // Egy ún. wrapper fv-t ad vissza. Pl. alul látszik, hogy a pReadDir
    // a promisify2(fs.readdir)-rel lesz egyenlő, tehát a pReadDir-be ez a
    // wrapper fv kerül, ezért amikor a pReadDir-t hívjuk, azt fogjuk paraméterezni
    // és ezek a paraméterek kerülnek ide az args-be.
    // A ...args egy ún. spread operátor, ami akárhány paramétert tud fogadni, 
    // és gyakorlatilag egy tömbként kezeli őket, ki is lehet console.log()-olni
    // az args-et.
    return (...args) => {
        //console.log(args);
        // Itt a wrapper fv-en belül egy Promise-ot adunk vissza...
        return new Promise((resolve, reject) => {
            // ...amiben csinálunk egy callback fv-t, hasonlóan a callback-es
            // feladatban látottakhoz, annyi különbséggel, hogy a hibát nem 
            // throw-oljuk, csak reject-eljük a promise-t, míg minden más esetben
            // a resolve segítségével feloldjuk a kapott eredményt.
            // A logika full ugyanaz, mint a callback-es feladatnál.
            const callbackFn = (err, res) => {
                if (err) reject(err);
                else resolve(res);
            }
            // Az argumentumok között alapból még nincs callback fv, ezért a push
            // segítségével berakjuk azt az utolsó helyre, ahová egyébként is való,
            // szintén lásd a callback-es feladatot... :)
            args.push(callbackFn);
            // Legvégül meghívjuk az fn fv-t az argumentumokkal (ebben már a fenti 
            // callback is benne van!)
            // Ez majd valamikor visszahívja a callback-et, ha elkészült, és mivel mindez
            // a Promise belsejében történik, mindaddig a promise "pending" állapotban lesz.
            fn(...args);
        });
    }
}

const pReadDir = promisify2(fs.readdir);
const pReadFile = promisify2(fs.readFile);
const pWriteFile = promisify2(fs.writeFile);

pReadDir('./inputs')
    .then(filenames => {
        console.log(filenames);
        const promises = filenames.map(filename => pReadFile(`./inputs/${filename}`));
        //console.log(promises);
        // Mind pending, de valahogy meg kéne várni mindet
        return Promise.all(promises);
    })
    .then(contents => {
        contents = contents.map(content => content.toString());
        console.log(contents);
        return contents.join('\n');
    })
    .then(output => pWriteFile('./concat-output.txt', output))
    .then(() => console.log('Vége'))
    .catch(err => {
        console.log(err);
    })

/*const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('foo'); // resolve('ok')
    }, 300);
}).then(
    val => {
        console.log(val);
    },
    err => {
        console.log(err);
    }
)//.catch(err => console.log(err))

console.log(p);*/