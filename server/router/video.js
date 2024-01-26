const express = require('express');
const router = express.Router();
const Video = require("../models/Video");
const Subscribe = require("../models/Subscribe");
const auth = require("../middleware/auth");
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname.replace(" ","_")}`);
    }
})

const fileFilter = (req, file, cb) => {
    console.log(file.mimetype)
    console.log("aaaaaaaaaaaaaaaaaaaa",file)
    if (file.mimetype == 'video/mp4' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
        cb(null, true);
    } else {
        cb({msg: 'mp4 파일만 업로드 가능합니다.'}, false);
    }
}

const upload = multer({storage: storage, fileFilter: fileFilter}).single("file")


router.post('/uploadfiles', (req, res) => {
    upload(req, res, err => {
        if (err) {
            console.error(err)
            return res.json({success: false, err})
        } else {
            return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
        }
    })
})

router.post('/uploadvideo', (req, res) => {
    const video = new Video(req.body);
    video.save()
    .then(doc => {
        return res.status(200).json({success: true})
    }).catch(err => {
        return res.json({success: false, err})
    })
})

router.get('/getvideos', async (req, res) => {
    try {
        const video = await Video.find().populate('writer').exec();
        return res.json({success: true, video})
    } catch (err) {
        return res.json({success: false, err});
    }
})

router.post('/getSubscriptionVideos', async (req, res) => {
    try {
        const subscribeInfo = await Subscribe.find({userFrom: req.body.userFrom}).exec();

        let subscribedUserArr = [];

        subscribeInfo.map(e => {
            subscribedUserArr.push(e.userTo)
        });

        const videosInfo = await Video.find({writer: {$in: subscribedUserArr}}).populate('writer').exec();
        return res.status(200).json({success: true, videosInfo})
    } catch (err) {
        return res.json({success: false, err});
    }
})

router.post('/getVideoDetail', async (req, res) => {
    try{
        const videoDetail = await Video.findOne({_id: req.body.videoId}).populate("writer").exec();
        return res.status(200).json({success: true, videoDetail});
    } catch(err) {
        return res.json({success: false, err})
    }
})

router.post('/thumbnail', (req, res) => {

    let filePath = "";
    let fileDuration = "";

    //비디오 가져오기
    //ffmpeg.setFfmpegPath("C:\\program files\\ffmpeg\\bin\\ffmpeg.exe");
    //ffmpeg.setFfmpegPath("C:\\program files\\ffmpeg\\bin\\ffprobe.exe");
    ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
        //console.dir(metadata)
        //console.log("sssssssssssssssssssssssssssssssssssssssssssssssssss",metadata.format.duration);
        fileDuration = metadata.format.duration
    })


    // 썸네일 생성
    ffmpeg(req.body.filePath)
    .on('filenames', function(filenames) {
        console.log('will generate ' + filenames.join(', '))
        console.log(filenames)

        filePath = `uploads/thumbnails/${filenames[0]}`
    })
    .on('end', function() {
        console.log('screenshots taken')
        return res.json({success: true, filePath: filePath, fileDuration: fileDuration})
    })
    .on('error', function(err) {
        console.error(err);
        return res.json({success: false, err});
    })
    .screenshots({
        count: 3,
        folder: 'uploads/thumbnails',
        size: '320x240',
        filename: 'thumbnail-%b.png'
    })
})


module.exports = router;