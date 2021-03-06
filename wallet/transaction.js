const ChainUtil = require('../chain-util');

class Transaction {
    constructor(){
        this.id = ChainUtil.id();
        this.input = null; // like BEFORE
        this.outputs = []; // like AFTER
    }

    update(senderWallet, recipient, amount) {
        const senderOutput = this.outputs.find(output => output.address == senderWallet.publicKey);

        if (amount > senderOutput.amount) {
            console.log(`Amount: ${amount} exceeds balance.`);
            return;
        }

        senderOutput.amount = senderOutput.amount - amount;
        this.outputs.push({ amount, address: recipient });
        Transaction.signTransaction(this, senderWallet);

        return this;
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
        Transaction.signTransaction(transaction, senderWallet);
        return transaction;
    }

    static signTransaction(transaction, senderWallet) {
        // state before transaction
        // why do we store signature in input?
        // input is hash but outputs is array
        transaction.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(ChainUtil.hash(transaction.outputs)) 
            // elliptic helps to make a signature which is the combination of (one-way-hash + privateKey) 
        }
    }


    static verifyTransaction(transaction) {
        // delegate
        return ChainUtil.verifySignature(
            transaction.input.address, 
            transaction.input.signature, 
            ChainUtil.hash(transaction.outputs)
        )
    }

    static _subtractSenderAmount(senderWallet, amount){
        return senderWallet.balance - amount
    }
}

module.exports = Transaction;