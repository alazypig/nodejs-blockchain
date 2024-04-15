const Transaction = require('./Transaction')
const Blockchain = require('./Chain')

const EdwardCoin = new Blockchain()
EdwardCoin.createTransaction(new Transaction('Alice', 'Bob', 50))
EdwardCoin.createTransaction(new Transaction('Bob', 'Charlie', 25))

console.log('miner Starting the miner...')
EdwardCoin.minePendingTransactions('miner')

console.log('miner balance: ', EdwardCoin.getBalanceOfAddress('miner'))
console.log('Bob balance: ', EdwardCoin.getBalanceOfAddress('Bob'))

console.log('\n another miner Starting the miner...')
EdwardCoin.minePendingTransactions('another miner')
console.log('miner balance: ', EdwardCoin.getBalanceOfAddress('miner'))

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
