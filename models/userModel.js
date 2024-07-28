const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Email is invalid'
        }
    },
    name: { 
        type: String, 
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    mobile: { 
        type: String, 
        required: [true, 'Mobile number is required'],
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        validate: {
            validator: function(value) {
                // Optional: Add custom validation for password strength if needed
                return validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                });
            },
            message: 'Password must be stronger'
        }
    }
});

module.exports = mongoose.model('User', userSchema);