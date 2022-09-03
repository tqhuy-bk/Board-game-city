const mongoose = require('mongoose');
const productsScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        category:{ 
            type: mongoose.Types.ObjectId, 
            ref: 'Categorys'
        },
        price:{
            type: String,
            required: true
        },
        numPlayerFrom:{
            type: Number
        },
        numPlayerTo:{
            type: Number
        },
        playingTime: {
            type:Number
        },
        age:{
            type: Number
        },
        level:{
            type: Number
        },
        desc:{
            type:String, 
            require: true
        },
        image:{
            type: Object,
            require: true
        }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Products', productsScheme);