import { ec as EC } from 'elliptic/lib/elliptic'

class Wallet {
  public wallet = undefined
  public walletAddress: string
  constructor() {
    const ec = new EC('secp256k1')

    this.wallet = ec.keyFromPrivate(
      'c058e5360463aedfbdc23af71786a5bd1e864e2071d018125742852ddaf809a0',
    )
    this.walletAddress = this.wallet.getPublic('hex')
  }
}

const myWallet = new Wallet()

export default myWallet
