const fs = require('fs');

// arrow function
fs.readdir('./inputs', (err, filenames) => {
    //console.log(err);
    if (err) throw err;
    console.log(filenames);
    let contents = [];
    filenames.forEach(filename => {
        fs.readFile(`./inputs/${filename}`, (err, content) => {
            console.log(`${filename}:`, content.toString());
            contents.push(content.toString());
            if (contents.length === filenames.length) {
                console.log(contents);
                fs.writeFile('./concat-output.txt', contents.join('\n'), (err) => {
                    if (err) throw err;
                    console.log('Vége');
                })
            }
        });
    });
});

// Ezzel az a baj, hogy "callback hell" jön létre

//console.log('Vége');