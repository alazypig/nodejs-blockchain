const Transaction = require('./Transaction.js')
const Blockchain = require('./Chain.js')
const EC = require('elliptic').ec

const ec = new EC('secp256k1')

const key = ec.keyFromPrivate(
  'c058e5360463aedfbdc23af71786a5bd1e864e2071d018125742852ddaf809a0',
)
const walletAddress = key.getPublic('hex')

// Signature Transaction
const EdwardCoin = new Blockchain()
const tx1 = new Transaction(walletAddress, 'public key here', 10)
tx1.signTransaction(key)
EdwardCoin.addTransaction(tx1)

EdwardCoin.minePendingTransactions(walletAddress)
EdwardCoin.minePendingTransactions(walletAddress)
console.log(
  'balance of wallet: ',
  EdwardCoin.getBalanceOfAddress(walletAddress),
)

// Transaction
// const EdwardCoin = new Blockchain()
// EdwardCoin.addTransaction(new Transaction('Alice', 'Bob', 50))
// EdwardCoin.addTransaction(new Transaction('Bob', 'Charlie', 25))
//
// console.log('miner Starting the miner...')
// EdwardCoin.minePendingTransactions('miner')
//
// console.log('miner balance: ', EdwardCoin.getBalanceOfAddress('miner'))
// console.log('Bob balance: ', EdwardCoin.getBalanceOfAddress('Bob'))
//
// console.log('\n another miner Starting the miner...')
// EdwardCoin.minePendingTransactions('another miner')
// console.log('miner balance: ', EdwardCoin.getBalanceOfAddress('miner'))

// Block chain
// const EdwardCoin = new Blockchain()
// console.log('Mining a new block...')
// EdwardCoin.addBlock(
//   new Block(
//     1,
//     new Date().getTime(),
//     { message: 'Hello World' },
//     EdwardCoin.getLatestBlock().hash,
//   ),
// )
//
// console.log('Mining a new block...')
// EdwardCoin.addBlock(
//   new Block(
//     2,
//     new Date().getTime(),
//     { message: 'Hello World' },
//     EdwardCoin.getLatestBlock().hash,
//   ),
// )

// console.log(JSON.stringify(EdwardCoin, null, 2))
// console.log('Blockchain is valid: ', EdwardCoin.isValidChain())
//
// // Now let's tamper with the data of the second block
// EdwardCoin.chain[1].data = { message: 'Goodbye World' }
// console.log('Blockchain is valid: ', EdwardCoin.isValidChain())
