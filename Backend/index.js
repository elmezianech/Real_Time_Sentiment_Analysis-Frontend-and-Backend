import express from "express"
import mongoose, { mongo } from "mongoose"
import dotenv from "dotenv"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

mongoose.connect(MONGOURL).then(()=>{
    console.log("Connected to Database.");
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error)=>{
    console.log(error);
});

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const userModel = mongoose.model('users', userSchema);

app.get("/getUsers", async(req, res)=>{
    const userData = await userModel.find();
    res.json(userData);
});

const tweetSchema = new mongoose.Schema({
    'Tweet ID': Number,
    TweetContent: String,
    Entity: String,
    Sentiment: String,
    prediction: String
});

const tweetModel = mongoose.model('tweets', tweetSchema);

app.get("/getTweets", async(req, res)=>{
    const tweetData = await tweetModel.find();
    res.json(tweetData);
});
