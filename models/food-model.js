const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({


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

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;