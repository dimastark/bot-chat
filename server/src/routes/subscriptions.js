const express = require('express');
const httpStatus = require('http-status-codes');
const request = require('request-promise-native');

const Subscription = require('../models/subscription');

const router = express.Router();

router.post('/', async (req, res) => {
    let {url, namespace, events} = req.body;

    try {
        await request.get(url);
        await Subscription.createOrUpdate({url, namespace, events});
    } catch (e) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    res.sendStatus(httpStatus.CREATED);
});

module.exports = router;
