const User = require('../models/User');

const root = {
    createUser: async ({ email, password, spotifyAccountLink }) => {
        const user = new User({ email, password, spotifyAccountLink });
        return await user.save();
    },
    userExists: async ({ email }) => {
        try {
          const user = await User.findOne({ email: email });
          return Boolean(user);
        } catch (error) {
          throw new Error('Error checking if user exists');
        }
      },
};

module.exports = root;