var express = require('express');
var router = express.Router();
var tweetModel = require('../models/tweetModel');

router.get("/", async(req, res)=>{
    const tweetData = await tweetModel.find();
    res.json(tweetData);
});