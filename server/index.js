const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');


//application/x-www-form/urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use('/api/users', require('./router/users'));
app.use('/api/video', require('./router/video'));
app.use('/api/subscribe', require('./router/subscribe'));
app.use('/api/comment', require('./router/comment'));
app.use('/api/like', require('./router/like'));

app.use('/api/boards', require('./router/boards'));


mongoose.connect(config.mongoURI, {
    //useNewUrlParser: true, useUnifiedTopology: true//, poolSize: 10
})
  .then(() => console.log('mongoDB connect...'))
  .catch(err => console.log(err))


app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({success:false, message:'Something broke!'});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})