// const Block = require('./block');
// const fooBlock = Block.mineBlock(Block.genesis(), 'foo');
// console.log(fooBlock.toString());

const Wallet = require('./wallet');
const wallet = new Wallet();
console.log(wallet.toString());