const Block = require('./Block')
const Transaction = require('./Transaction')

class Blockchain {
  constructor() {
    this.chain = [this.__createGenesisBlock()]
    this.difficulty = 2
    this.pendingTransactions = []
    this.miningReward = 100
  }

  __createGenesisBlock() {
    return new Block(new Date().getTime(), [])
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  minePendingTransactions(minerRewardAddress) {
    const block = new Block(new Date().getTime(), this.pendingTransactions)
    block.mineBlock(this.difficulty)

    this.chain.push(block)

    // 发放收益
    // the mining reward will only be sent when the next block is mined, not when a new transaction is added
    this.pendingTransactions = [
      new Transaction(null, minerRewardAddress, this.miningReward),
    ]
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction)
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

module.exports = Blockchain
