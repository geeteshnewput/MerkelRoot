const crypto = require('crypto');

class MerkelTree {
    constructor(transactions = []) {
        this.transactions = transactions;
        this.merkelTree = [];
        this.start();
      }
    
    start() {
        // hashTransactions
        this.createTree(this.transactions)
    }

    hash(hashString) {
        // create Hash
        return crypto.createHash('sha256').update(hashString).digest('hex');
    }

    createTree(transactions) {
            // Example:- 
            //             0123
            //     01              23
            
            // 0       1       2       3

        // creating tree with leaf nodes and hashing it.
        transactions.map(transaction => {
            const transactionHash = this.hash(transaction);
            this.merkelTree.push(transactionHash);
        });

        // Now creating the whole merkelTree.
        let curLayer = this.merkelTree;
        // updating current layer recursivly
        while (curLayer.length > 1) {
            let nextLayer = [];
            for (let index = 0; index < curLayer.length; index += 2) {
                const combinedHash = this.hash(curLayer[index] + curLayer[index+1]);
                nextLayer.push(combinedHash);
            }
            curLayer = nextLayer;
            // concating layer wise inside the merkelTree.
            this.merkelTree.concat(curLayer);
        }
    }

    fetchMerkelRoot() {
        return this.merkelTree[this.merkelTree.length - 1];
    }

    verifyTransaction() {

    }

}
module.exports = MerkelTree;