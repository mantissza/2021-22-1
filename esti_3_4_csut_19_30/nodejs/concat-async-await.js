const fs = require('fs');
const { promisify } = require('util');

const pReadDir = promisify(fs.readdir);
const pReadFile = promisify(fs.readFile);
const pWriteFile = promisify(fs.writeFile);

// async, await
/*async function valami() {
    // ...
}
valami();*/

/*
// ezért kell a pontosvessző a self invoke elé:
let asd = {
    aa: 1
}*/

// Self invoke function
;(async () => {
    const filenames = await pReadDir('./inputs');
    console.log(filenames);
    let contents = [];
    for (let filename of filenames) {
        contents.push(
            await pReadFile(`./inputs/${filename}`)
        );
    }
    await pWriteFile(
        './concat-output.txt', 
        contents
            .map(content => content.toString())
            .join('\n')
    );
    console.log('Vége');
})();

/*
pReadDir('./inputs')
    .then(filenames => {
        console.log(filenames);
        const promises = filenames.map(filename => pReadFile(`./inputs/${filename}`));
        //console.log(promises);
        return Promise.all(promises);
    })
    .then(contents => {
        contents = contents.map(content => content.toString());
        //console.log(contents);
        return contents.join('\n');
    })
    // Output kiírása lesz
    .then(output => pWriteFile('./concat-output.txt', output))
    .then(() => console.log('Vége'))
    .catch(err => console.log(err));
*/
