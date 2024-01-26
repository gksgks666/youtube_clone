const express = require('express');
const router = express.Router();
const Board = require("../models/Board");
const boardCheck = require('../middleware/boardCheck');


router.post('/create', async (req, res) => {
    const board = new Board(req.body);
  
    try {
      await board.save();
      return res.status(200).json({success:true})
    } catch (err) {
      console.error(err)
      return res.json({success: false, err})
    }
  })
  
router.get('/find', async (req, res) => {
    try {
        const boardInfo = await Board.find({});
        return res.status(200).json({success:true,boardInfo})
    } catch (err) {
        console.error(err)
        return res.json({success: false, err})
    }
})
  
router.get('/findOne/:id', boardCheck, async (req, res) => {
    try {
        const boardInfo = await Board.findById(req.params.id);
        if (!boardInfo) return res.status(404).json({success: false, message: 'Board not found'});
        return res.status(200).json({success:true,boardInfo})
    } catch (err) {
        console.error(err)
        return res.json({success: false, message: err})
    }
})

router.put('/update/:id', boardCheck, async (req, res) => {
    try {
        await Board.updateOne({_id: req.params.id}, {title: req.body.title, content: req.body.content})
        return res.status(200).json({success:true})
    } catch (err) {
        console.error(err)
        return res.json({success: false, message: err})
    }
})

router.delete('/delete/:id', boardCheck, async (req, res) => {
    try {
        await Board.deleteOne({_id: req.params.id})
        return res.status(200).json({success:true})
    } catch (err) {
        console.error(err)
        return res.json({success: false, message: err})
    }
})

module.exports = router;