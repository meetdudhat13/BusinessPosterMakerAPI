const mongoos = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URL_LOCAL


const connectDB = async() =>{
    try{
        await mongoos.connect(mongoURL);
        console.log("MongoDB connected");
    }catch(error){
        console.error("MongoDb connection error");
        console.error(error);
        process.exit(1);
    }
};


module.exports = connectDB; 