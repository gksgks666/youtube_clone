const express = require('express');
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");


router.post('/register', async (req, res) => {
    //회원 가입 할때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body);
  
    try {
      await user.save();
      return res.status(200).json({success:true})
    } catch (err) {
      console.error(err)
      return res.json({success: false, message: err})
    }
})
  
router.post('/login', (req,res) => {

    //요청된 이메일을 데이터베이스에서 있는지 찾는다
    User.findOne({email: req.body.email})
    .then(user => {
        if (!user) return res.json({
            loginSuccess: false,
            message: "해당 이메일과 일치하는 사용자가 없습니다."
        })

        //요청된 이메일이 데이터베이스에 있다면 맞는 비밀번호인지 확인
        user.comparePassword(req.body.password, (err,isMatch) => {
            if (!isMatch) {
                return res.json({loginSuccess: false, message: "비밀번호가 일치하지 않습니다."});
            }

            //비밀번호까지 맞다면 토큰을 생성하기
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                //토큰 저장하기
                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id})
            })
        })
    })
    .catch ((err) => {
    return res.status(400).send(err)
    })
})

router.get('/auth', auth, (req, res) => {
    //auth를 통과
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ""})
        .then (() => {
            return res.status(200).send({success: true});
        })
        .catch (err => {
            return res.json({success: false, message: err});
        })
})

module.exports = router;