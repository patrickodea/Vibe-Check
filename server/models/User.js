const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    spotifyAccountLink: String
});

// add correctPassword method to userSchema
userSchema.methods.isCorrectPassword = async function (password) {
    return await password === this.password;
};

const User = mongoose.model('User', userSchema);

module.exports = User;