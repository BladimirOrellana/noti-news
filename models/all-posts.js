const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const allSchema = new Schema({


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

const All = mongoose.model("All", allSchema);
module.exports = All;