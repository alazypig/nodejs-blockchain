### How to use 

```bash
#current node version 20.12.1
npm install
npm run dev
# run the server on http://localhost:3000
```

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

### Signature Transaction

Signature Transaction是一种特殊的交易，它可以让用户对交易进行签名，然后将签名后的交易发送给网络。

Signature Transaction的流程如下：

1. 用户创建交易，并对交易进行签名。
2. 用户将签名后的交易发送给网络。
3. 网络将签名后的交易加入到交易池中。
4. 矿工收集交易池中的所有Pending交易，并将它们打包成一个新的区块。
5. 矿工生成新的区块，并将其发送给网络中的其他矿工。
6. 网络中的其他矿工验证区块的有效性，并将其加入到区块链中。
7. 区块链的状态更新


签名过程如下：

1. 用户选择一个私钥，并使用私钥对交易进行签名。
2. 用户将签名后的交易发送给网络。
3. 网络验证签名是否正确。
4. 如果签名正确，网络将签名后的交易加入到交易池中。
5. 矿工收集交易池中的所有Pending交易，并将它们打包成一个新的区块。
6. 矿工生成新的区块，并将其发送给网络中的其他矿工。
7. 网络中的其他矿工验证区块的有效性，并将其加入到区块链中。
8. 区块链的状态更新。


1. `Key (生成) [Private Key, Public Key]`
2. `key + 交易Hash (签名) signature`
3. 验证： `key + 交易的Hash (签名) new signature，与传入的 signautre 进行比较` 此部分不需要私钥，只需要公钥和交易Hash即可验证签名是否正确。

