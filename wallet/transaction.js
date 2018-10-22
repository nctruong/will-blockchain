const ChainUtil = require('../chain-util');

class Transaction {
    constructor(){
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    static newTransaction(senderWallet, recipient, amount) {
        const transaction = new this(); // new instance of current class

        if ( amount > senderWallet.balance) {
            console.log(`Amount: ${amount} exceeds balance.`);
            return;
        }

        transaction.outputs.push(...[
            { amount: Transaction._subtractSenderAmount(senderWallet, amount), address: senderWallet.publicKey }, // subtract sender's amount
            { amount, address: recipient }
        ])

        return transaction;
    }

    static _subtractSenderAmount(senderWallet, amount){
        return senderWallet.balance - amount
    }
}

module.exports = Transaction;