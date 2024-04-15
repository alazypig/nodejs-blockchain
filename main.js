const SHA256 = require('crypto-js/sha256')

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp
    this.transactions = transactions
    this.previousHash = previousHash
    this.hash = this.calculateHash()
    this.__nonce = 0
  }

  calculateHash() {
    return SHA256(
      this.timestamp +
        JSON.stringify(this.data) +
        this.previousHash +
        this.__nonce,
    ).toString()
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.hash = this.calculateHash()
      this.__nonce++
    }

    console.log('Block mined: ', this.hash)
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.__createGenesisBlock()]
    this.difficulty = 2
    this.pendingBlocks = []
    this.miningReward = 100
  }

  __createGenesisBlock() {
    return new Block(
      0,
      new Date().getTime(),
      { message: 'Genesis Block From Edward' },
      '0',
    )
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  minePendingTransactions(minerRewardAddress) {
    const block = new Block(new Date().getTime(), minerRewardAddress)
    block.mineBlock(this.difficulty)

    console.log('Block mined: ', block.hash)

    this.chain.push(block)

    this.pendingBlocks = [
      // 发放收益
      new Transaction(null, minerRewardAddress, this.miningReward),
    ]
  }

  createTransaction(transaction) {
    this.pendingBlocks.push(transaction)
  }

  getBalanceOfAddress(address) {
    let balance = 0

    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.fromAddress === address) balance -= transaction.amount

        if (transaction.toAddress === address) balance += transaction.amount
      }
    }

    return balance
  }

  addBlock(block) {
    block.previousHash = this.getLatestBlock().hash
    block.mineBlock(this.difficulty)
    this.chain.push(block)
  }

  isValidChain() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }

      if (currentBlock !== previousBlock.hash) {
        return false
      }
    }

    return true
  }
}

const EdwardCoin = new Blockchain()
EdwardCoin.createTransaction(
  new Transaction('Alice', 'Bob', 50),
)
EdwardCoin.createTransaction(
  new Transaction('Bob', 'Charlie', 25),
)
console.log(EdwardCoin.getBalanceOfAddress('Bob'))

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
