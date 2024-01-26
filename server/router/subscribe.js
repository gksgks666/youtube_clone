const express = require('express');
const router = express.Router();
const Subscribe = require("../models/Subscribe");
const auth = require("../middleware/auth");


router.post('/subscribeNumber', async (req, res) => {
    try {
        const subscribe = await Subscribe.find({userTo: req.body.userTo}).exec();
        return res.json({success: true, subscribeNumber: subscribe.length});
    } catch (err) {
        return res.json({success: false, err});
    }
})

router.post('/subscribed', async (req, res) => {
    try {
        const subscribe = await Subscribe.find({userTo: req.body.userTo, userFrom: req.body.userFrom}).exec();
        let result = subscribe.length !== 0 ? true : false;
        return res.json({success: true, subscribed: result});
    } catch (err) {
        return res.json({success: false, err});
    }
})

router.post('/unsubscribe', async (req, res) => {
    try {
        const subscribe = await Subscribe.findOneAndDelete({userTo: req.body.userTo, userFrom: req.body.userFrom}).exec();
        return res.json({success: true, subscribe});
    } catch (err) {
        return res.json({success: false, err});
    }
})

router.post('/subscribe', async (req, res) => {
    try {
        const subscribe = new Subscribe(req.body);
        await subscribe.save();
        return res.status(200).json({success: true});
    } catch (err) {
        return res.json({success: false, err});
    }
})

module.exports = router;