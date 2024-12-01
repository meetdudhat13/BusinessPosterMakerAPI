const mongoos = require('mongoose');

const connectDB = async() =>{
    try{
        await mongoos.connect('mongodb://localhost:27017/posterdb');
        console.log("MongoDB connected");
    }catch(error){
        console.error("MongoDb connection error");
        console.error(error);
        process.exit(1);
    }
};


module.exports = connectDB;