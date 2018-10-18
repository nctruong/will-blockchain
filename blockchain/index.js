const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock(data) {
        const block = Block.mineBlock(this.chain[this.chain.length-1], data);
        this.chain.push(block);
        return block;
    }

    isValidChain(chain) {
        // TODO: Why don't we compare with current chain?
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        for (let i=1; i<chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i-1]
            if ((block.lastHash !== lastBlock.hash) || (block.hash !== Block.blockHash(block))) {
                return false;
            }
        }
        return true;
    }

    replaceChain(newChain) {
        // newChain was out of date
        if (newChain.length <= this.chain.length) {
            console.log('Received chain is not longer than the current chain.')
            return;
        // newChain is not valid
        } else if (!this.isValidChain(newChain)){
            console.log('The received chain is not valid.')
            return;
        }
        // finanlly, chain replaced by newChain if it's valid
        console.log('Replacing blockchain with the new chain.');
        this.chain = newChain;
    }
}

module.exports = Blockchain;