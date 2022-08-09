const SHA256 = require('crypto-js/sha256')


    class Transactions {
        constructor(fromAdress, toAdress, mount) {
            this.fromAdress = fromAdress;
            this.toAdress = toAdress;
            this.amount = this.amount
        }


    }
    class  Block{

        constructor(timestamp, transactions, previousHash = '') {
            this.timestamp = timestamp,
            this.transactions = transactions,
            this.prevoupreviousHash = previousHash,
            this.hash = this.calculateHash();
            this.nonce = 0;
        }
    
        
  calculateHash() {
    return SHA256(
      this.index +
        this.prevoupreviousHash +
        this.timestamp +
        JSON.stringify(this.transactions) + this.nonce
    ).toString()
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
        this.nonce++;
        this.hash = this.calculateHash()
    }

    console.log("Block mined: " + this.hash);
  }
}



class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
    this.difficulty = 2
    this.pendingTransactions = []

    // 100 coins if succesfully mining a block
    this.miningReward  = 100
  }

  createGenesisBlock() {
    return new Block('09/08/2022', 'Genesis block', '0')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }


  minePendingTransactions(miningRewardAdress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty)
    console.log('block successfully mined !');
    this.chain.push(block);

    this.pendingTransactions = [
        new Transactions(null, miningRewardAdress, this.miningReward)
    ]
}

createTransaction(transaction){
    this.pendingTransactions.push(transaction)
}

getBalanceOfAdress(address) {
    let balance = 0 

    for(const block of this.chain){
        for (const trans of block.transactions){
            if(trans.fromAdress === address){
                balance -= trans.amount;

            }

            if(trans.toAdress === address) {
                balance += trans.amount;
            }
        }
    }

    return balance
}

  isChainValid(newBlock) {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }
    return true
  }
}

let krystoCoins = new Blockchain()

krystoCoins.createTransaction(new Transactions("Adress1", "Adress2", 12))
krystoCoins.createTransaction(new Transactions("Adress2", "Adress1", 50))


console.log('\n Starting the miner ....');
krystoCoins.minePendingTransactions('stoyann-adress')

console.log('\n Balance of stoyann is', krystoCoins.getBalanceOfAdress('stoyann-adress'));

console.log('\n Starting the miner again  ....');
krystoCoins.minePendingTransactions('stoyann-adress')
console.log('\n Balance of stoyann is', krystoCoins.getBalanceOfAdress('stoyann-adress'));