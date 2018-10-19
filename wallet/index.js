const ChainUtil = require('../chain-util');
const { INITIAL_BALANCE } = require('../config');

class Wallet {
    constructor(){
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
        console.log `keyPair: ${this.keyPair}, publicKey: ${this.publicKey}`
    }

    toString(){
        return `Wallet - 
            publicKey: ${this.publicKey.toString()}
            balance  : ${this.balance}
        `
    }
}

module.exports = Wallet;