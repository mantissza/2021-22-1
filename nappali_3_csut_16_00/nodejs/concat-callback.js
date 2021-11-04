const fs = require('fs');

// fs.readdir('./inputs', function (err, files) { ... });

// arrow function
fs.readdir('./inputs', (err, filenames) => {
    console.log(err);
    if (err) throw err;
    console.log(filenames);
    let contents = [];
    filenames.forEach(filename => {
        fs.readFile(`./inputs/${filename}`, (err, content) => {
            if (err) throw err;
            console.log(`${filename}:`, content.toString());
            contents.push(content.toString());
            if (contents.length === filenames.length) {
                // Ezen a ponton már tudom, hogy az összes fájlnak
                // a tartalma megvan a contents tömbben, így eljött
                // az idő, hogy kiírjuk azokat egy output fájlba
                console.log(contents);
                fs.writeFile('./concat-output.txt', contents.join('\n'), (err) => {
                    if (err) throw err;
                    console.log('Vége');
                })
            }
        })
    })
});

// Mi ezzel a gond? Callback hell.

//console.log('Vége');