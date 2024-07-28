const User = require('../models/userModel');

async function createUser(req,res){
    try {
        const { email, name, mobile } = req.body;
        const user = new User({ email, name, mobile });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getUserDetails(req,res){
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {createUser, getUserDetails};