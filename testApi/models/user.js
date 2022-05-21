const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    
}, {
    timeseries: true
});

// UserSchema.pre('create', (next) => {
//     var salt = bcrypt.genSaltSync(10);
//     this.password= bcrypt.hashSync(this.password, salt);
//     console.log(this.password);
//     next();
// })

module.exports = mongoose.model('User', UserSchema);