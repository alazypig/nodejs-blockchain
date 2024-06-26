const SHA256 = require('crypto-js/sha256')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
  }

  calculateHash() {
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString()
  }

  signTransaction(signingKey) {
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('You cannot sign transactions for other wallets!')
    }

    const hashTx = this.calculateHash()
    const signature = signingKey.sign(hashTx, 'base64')

    this.signature = signature.toDER('hex')
  }

  isValid() {
    if (this.fromAddress === null) {
      // 矿工收益 没有fromAddress
      return  true
    }
    if (!this.signature || this.signature.length === 0) {
      throw new Error('No signature found.')
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex')

    return publicKey.verify(this.calculateHash(), this.signature)
  }
}

module.exports = Transaction
