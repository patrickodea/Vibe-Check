const User = require('../models/User');

const root = {
    user: async ({ id }) => {
        return await User.findById(id);
    },
    users: async () => {
        return await User.find();
    },
    createUser: async ({ email, password, spotifyAccountLink }) => {
        const user = new User({ email, password, spotifyAccountLink });
        return await user.save();
    }
};

module.exports = root;