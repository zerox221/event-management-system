const mongoose = require('mongoose');

const forgetPasswordSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true,
    },
    otp : {
        type : String,
        required : true,
    }
},
{timestamps : true},
)

forgetPasswordSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3 * 60 });

module.exports = mongoose.model("forgetPassword",forgetPasswordSchema);