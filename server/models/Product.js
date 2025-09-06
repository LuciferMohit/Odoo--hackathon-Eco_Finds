// In server/models/Product.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    // --- ADD THIS FIELD ---
    // This links each product to a user
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User', // This refers to your 'User' model
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Product', productSchema);