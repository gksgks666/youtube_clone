const Board = require('../models/Board');

const getBoard = async (req, res, next) => {
    let boardData;
    try {
        boardData = await Board.findById(req.params.id);
        if (!boardData) return res.status(400).json({message: '게시물을 찾을 수 없습니다.'})
        next();
      } catch (err) {
        next(err);
      }
}

module.exports = getBoard