const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sportSchema = new Schema({


    title:{
        type: String,
        required: true
    },
    link:{
        type: String,
        unique: true
     },
    photo: {
        type: String
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

const Sport = mongoose.model("Sport", sportSchema);
module.exports = Sport;