'use client'

import { Button, Card, List, Table, message, Modal, Input } from 'antd'
import { useState } from 'react'

import myWallet from 'model/Wallet'
import EdwardCoin from 'model/BlockChain'
import Transaction from 'blockchain/Transaction'
import type Block from 'blockchain/Block'

import './index.css'

const Page = () => {
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState(0)
  const [pendingTransactions, setPendingTransactions] = useState<
    Array<Transaction>
  >([...EdwardCoin.pendingTransactions])
  const [chain, setChain] = useState<Array<Block>>([...EdwardCoin.chain])
  const [showModal, setShowModal] = useState<boolean>(false)

  const transaction = (address: string, amount: number) => {
    const tx = new Transaction(myWallet.walletAddress, address, amount)

    tx.signTransaction(myWallet.wallet)

    EdwardCoin.addTransaction(tx)
    setPendingTransactions([...EdwardCoin.pendingTransactions])
    message.success('Transaction added successfully')
  }

  const mine = () => {
    EdwardCoin.minePendingTransactions(myWallet.walletAddress)

    setChain([...EdwardCoin.chain])
    setPendingTransactions([...EdwardCoin.pendingTransactions])
    message.success('Blockchain mine successfully')
  }

  const resetTransaction = () => {
    setToAddress('')
    setAmount(0)
    setShowModal(false)
  }

  const transactionOk = () => {
    try {
      if (toAddress === '' || amount === 0) {
        throw new Error('Please input address and amount')
      }

      if (amount < 0) {
        throw new Error('Amount must be a positive integer')
      }

      transaction(toAddress, amount)
    } catch (error) {
      message.error(error.message)
    } finally {
      resetTransaction()
    }

  }

  return (
    <div
      style={{
        margin: '0 50px',
      }}>
      <Modal open={showModal} onOk={transactionOk} onCancel={resetTransaction}>
        <h1>To</h1>
        <Input
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          placeholder="Address"
        />
        <h1>Amount</h1>
        <Input
          value={amount}
          type="number"
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
        />
      </Modal>

      <Button
        onClick={() => {
          setShowModal(true)
        }}>
        Send
      </Button>
      <Button
        onClick={() => {
          mine()
        }}>
        Mine
      </Button>
      <List
        itemLayout={'horizontal'}
        dataSource={chain}
        renderItem={(block) => (
          <List.Item
            style={{
              display: 'inline-block',
              marginRight: 30,
              float: 'left',
            }}>
            <Card size={'small'} style={{ minHeight: 420 }}>
              <p>hash:</p>
              <p style={{ width: 200, wordWrap: 'break-word' }}>
                {block.hash.toString()}
              </p>
              <p>previousHash:</p>
              <p style={{ width: 200, wordWrap: 'break-word' }}>
                {block.previousHash.toString() || 'null'}
              </p>
              <p>nonce:</p>
              <p style={{ width: 200, wordWrap: 'break-word' }}>
                {block.__nonce.toString()}
              </p>
              <p>timestamp:</p>
              <p style={{ width: 200, wordWrap: 'break-word' }}>
                {block.timestamp.toString()}
              </p>
            </Card>
          </List.Item>
        )}
      />

      <Table
        dataSource={pendingTransactions}
        rowKey={(i) => i.hash}
        columns={[
          {
            title: 'From',
            dataIndex: 'fromAddress',
            render: (text) => (
              <div style={{ width: '500px' }}>{text ?? 'blockchain'}</div>
            ),
          },
          {
            title: 'To',
            dataIndex: 'toAddress',
            render: (text) => <div style={{ width: '500px' }}>{text}</div>,
          },
          {
            title: 'Amount',
            dataIndex: 'amount',
          },
          {
            title: 'isValid',
            render: (i) => (i.isValid() ? '✅' : '❌'),
          },
        ]}
      />
    </div>
  )
}

export default Page
