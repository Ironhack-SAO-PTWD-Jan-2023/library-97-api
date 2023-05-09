const bcrypt = require('bcryptjs');

const plainPassword1 = 'HelloWorld';
const plainPassword2 = 'helloWorld';

const salt = bcrypt.genSaltSync(12) // salt rounds

const hash1 = bcrypt.hashSync(plainPassword1, salt);
const hash2 = bcrypt.hashSync(plainPassword2, salt);

// console.log(`Salt -> ${salt}`);
// console.log(`Hash1: ${hash1}`);
// console.log(`Hash2: ${hash2}`);

const verifyPassword1 = bcrypt.compareSync('HelloWorld', hash1);
const verifyPassword2 = bcrypt.compareSync('HelloWorld', hash2);

// console.log(`Compare 1: ${verifyPassword1}`);
// console.log(`Compare 2: ${verifyPassword2}`);

for (let saltRounds = 8; saltRounds < 19; saltRounds += 1) {
  console.time(`bcrypt | cost ${saltRounds}, time to hash`);
  bcrypt.hashSync(plainPassword1, saltRounds);
  console.timeEnd(`bcrypt | cost ${saltRounds}, time to hash`);
}
