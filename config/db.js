const mongoos = require('mongoose');

const connectDB = async() =>{
    try{
        await mongoos.connect('mongodb+srv://Meet:13092004@posterdb.zhywv.mongodb.net/poster_db');
        console.log("MongoDB connected");
    }catch(error){
        console.error("MongoDb connection error");
        console.error(error);
        process.exit(1);
    }
};


module.exports = connectDB; 