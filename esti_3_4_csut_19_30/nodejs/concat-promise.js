const fs = require('fs');
const { promisify } = require('util');

const promisify2 = (fn) => {
    // Wrapper fv
    return (...args) => {
        return new Promise((resolve, reject) => {
            const callbackFn = (err, data) => {
                if (err) reject(err);
                else resolve(data);
            }
            //console.log(args);
            args.push(callbackFn);
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

