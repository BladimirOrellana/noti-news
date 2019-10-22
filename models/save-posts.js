const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saveSchema = new Schema({


    title:{
        type: String,
        required: true
    },
    link:{
        type: String
     },
    photo: {
        type: String
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

const Save = mongoose.model("Save", saveSchema);
module.exports = Save;