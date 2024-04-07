const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        name: {
            type: String,
            required: [true, "Pleace add a name"]
        },
        email: {
            type: String,
            required: [true, "Pleace add a email address"]
        },
        phone: {
            type: String,
            required: [true, "Pleace add a phone number"]
        },
    }, {
    timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);