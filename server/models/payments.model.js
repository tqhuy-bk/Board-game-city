const mongoose = require('mongoose');

const PaymentsSchema = new mongoose.Schema(
    {
        user_id: { 
            type: mongoose.Types.ObjectId, 
            ref: 'Users',
            require: true
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: Object,
            required: true,
        },
        cart: {
            type: Array,
            default: [],
        },
        status: {
            type: Boolean,
            default: false,
        },
        paymentID:{
            type: String
        }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Payments', PaymentsSchema);
