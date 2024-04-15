### 矿工POW流程

链上有两笔Pending的交易，需要打包进区块。

目前的区块链状态：

```text
创世块: {
    "pendingTransactions": [Transaction1, Transaction2]
}
```

矿工A开始工作，他的任务是生成新的区块。他首先收集交易池中的所有Pending交易，并将它们打包成一个新的区块。

```text
1. 矿工A收集交易池中的所有Pending交易，并将它们打包成一个新的区块。
2. 矿工A生成新的区块，并将其发送给网络中的其他矿工。
3. 网络中的其他矿工验证区块的有效性，并将其加入到区块链中。
4. 区块链的状态更新为：

创世块: {} -> 区块1: {
    "transactions": [Transaction1, Transaction2],
    "pendingTransactions": [MinerRewardTransaction] // 矿工奖励
}
```

矿工A的奖励是一笔MinerRewardTransaction，其余的交易都被打包进区块1。
链上有了新的交易，这时候区块链的状态为：

```text
创世块: {} -> 区块1: {
    "transactions": [Transaction1, Transaction2],
    "pendingTransactions": [MinerRewardTransaction, Transaction3, Transaction4]
}
```

新的矿工B开始工作，工作结束后，区块链的状态为：

```text
创世块: {} -> 区块1: {
    "transactions": [Transaction1, Transaction2],
} -> 区块2: {
    "transactions": [MinerRewardTransaction, Transaction3, Transaction4],
    "pendingTransactions": [MinerRewardTransaction] // 矿工奖励
}
```

矿工A的奖励在矿工B完成任务时才会send给他。
