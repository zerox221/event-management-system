const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("DB CONNECTED");
    })
    .catch((error)=>{
        console.log(error);
        process.exit(1);
    })
}

module.exports = connectDB;