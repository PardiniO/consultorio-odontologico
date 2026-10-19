const bcrypt = require('bcrypt')

async function crearpass(){
const pass = await bcrypt.hash('root2', 10);
console.log(pass);
}

crearpass()