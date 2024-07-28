const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid email address']
    },
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    mobile: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);
