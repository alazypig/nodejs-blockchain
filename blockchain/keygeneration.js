const EC = require('elliptic').ec
const es = new EC('secp256k1')

const key = es.genKeyPair()
const publicKey = key.getPublic('hex')
const privateKey = key.getPrivate('hex')

console.log("publicKey", publicKey)
console.log()
console.log("privateKey", privateKey)
