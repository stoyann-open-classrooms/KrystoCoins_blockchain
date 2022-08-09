const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash="") {
        this.index = index ,
        this.timestamp = timestamp ,
        this.data = data ,
        this.prevoupreviousHash =previousHash,
        this.hash = this.calculateHash()
    }


    calculateHash() {
        return SHA256(this.index + this.prevoupreviousHash + this.timestamp + JSON.stringify(this.data)).toString()
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0 , "09/08/2022", "Genesis block", "0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock)
    }

    isChainValid(newBlock){
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false
            }


        }
        return true
    }
}

let krystoCoins = new Blockchain();
krystoCoins.addBlock(new Block(1, "10/07/2022", {amount : 4}))
krystoCoins.addBlock(new Block(2, "12/07/2022", {amount : 24}))


console.log(' Is blockchain valid? ' + krystoCoins.isChainValid());
krystoCoins.chain[1].data = {amount: 100};
krystoCoins.chain[1].hash= krystoCoins.chain[1].calculateHash()

console.log(' Is blockchain valid? ' + krystoCoins.isChainValid());

//console.log(JSON.stringify(krystoCoins, null, 4));