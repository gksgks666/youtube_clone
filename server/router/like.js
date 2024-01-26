const express = require('express');
const router = express.Router();
const Like = require("../models/Like");
const Dislike = require("../models/Dislike");


router.post('/getLike', async (req, res) => {
    try {
        let variable = {};
        if (req.body.videoId) variable = {videoId: req.body.videoId}
        else variable = {commentId: req.body.commentId}

        const resultData = await Like.find(variable).exec();
        return res.status(200).json({success: true, resultData});
    } catch (err) {
        return res.json({success: false, err});
    }
})

router.post('/getDislike', async (req, res) => {
    try {
        let variable = {};
        if (req.body.videoId) variable = {videoId: req.body.videoId}
        else variable = {commentId: req.body.commentId}

        const resultData = await Dislike.find(variable).exec();
        return res.status(200).json({success: true, resultData});
    } catch (err) {
        return res.json({success: false, err});
    }
})

router.post('/upLike', async (req, res) => {
    try {
        let variable = {};
        if (req.body.videoId) variable = {videoId: req.body.videoId, userId: req.body.userId}
        else variable = {commentId: req.body.commentId, userId: req.body.userId}

        const like = new Like(variable);
        await like.save();
        await Dislike.findOneAndDelete(variable);

        return res.status(200).json({success: true});
    } catch (err) {
        console.error(err)
        return res.json({success: false, err});
    }
})

router.post('/unlike', async (req, res) => {
    try {
        let variable = {};
        if (req.body.videoId) variable = {videoId: req.body.videoId, userId: req.body.userId}
        else variable = {commentId: req.body.commentId, userId: req.body.userId}

        await Like.findOneAndDelete(variable);

        return res.status(200).json({success: true});
    } catch (err) {
        console.error(err)
        return res.json({success: false, err});
    }
})

router.post('/upDislike', async (req, res) => {
    try {
        let variable = {};
        if (req.body.videoId) variable = {videoId: req.body.videoId, userId: req.body.userId}
        else variable = {commentId: req.body.commentId, userId: req.body.userId}

        const dislike = new Dislike(variable);
        await dislike.save();
        await Like.findOneAndDelete(variable);

        return res.status(200).json({success: true});
    } catch (err) {
        console.error(err)
        return res.json({success: false, err});
    }
})

router.post('/unDislike', async (req, res) => {
    try {
        let variable = {};
        if (req.body.videoId) variable = {videoId: req.body.videoId, userId: req.body.userId}
        else variable = {commentId: req.body.commentId, userId: req.body.userId}

        await Dislike.findOneAndDelete(variable);

        return res.status(200).json({success: true});
    } catch (err) {
        console.error(err)
        return res.json({success: false, err});
    }
})

module.exports = router;