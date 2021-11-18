const bcrypt = require('bcrypt');

const plainTextPassword = 'password';

const hash1 = bcrypt.hashSync(plainTextPassword, bcrypt.genSaltSync(12));
const hash2 = bcrypt.hashSync(plainTextPassword, bcrypt.genSaltSync(12));

console.log(hash1);
console.log(hash2);

console.log(bcrypt.compareSync(plainTextPassword, hash1));
console.log(bcrypt.compareSync(plainTextPassword, hash2));
console.log(bcrypt.compareSync("Password", hash2));