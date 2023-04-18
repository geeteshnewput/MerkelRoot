const express = require('express');
const router = express.Router();
const MerkelTree = require('../merkelTree');

router.get('/', async (req, res) => {
    const txxn = ['txn0', 'txn1', 'txn2', 'txn3']
    const transactions = req.body?.transactions || txxn;
    const merkelTreeInstance = new MerkelTree(transactions);
    const responseObj = {
      merkelRoot: merkelTreeInstance.fetchMerkelRoot(),
    }
    res.status(200).json({responseObj})
});

module.exports = router;