const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now, // 현재 시간을 기본값으로 설정
    },
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board