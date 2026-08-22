const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    event : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Event",
    },
    volunteers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ]
})

module.exports = mongoose.model("volunteer",volunteerSchema);