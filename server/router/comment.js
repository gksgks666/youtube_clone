const express = require('express');
const router = express.Router();
const Comment = require("../models/Comment");


router.post('/saveComment', async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        const resultData = await Comment.find({_id: comment._id}).populate('writer').exec();
        return res.status(200).json({success: true, resultData});
    } catch (err) {
        return res.json({success: false, err});
    }
})

router.post('/getComments', async (req, res) => {
    try {
        const resultData = await Comment.find({videoId: req.body.videoId}).populate('writer').exec();
        return res.status(200).json({success: true, resultData});
    } catch (err) {
        return res.json({success: false, err});
    }
})

module.exports = router;