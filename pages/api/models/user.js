const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    phone: String,
    address: String
});

mongoose.model('User', UserSchema);