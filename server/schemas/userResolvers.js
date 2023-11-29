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
    loginUser: async ({ email, password }) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error('User not found');
        }
  
        if (user.password !== password) {
          throw new Error('Invalid password');
        }
  
        return user;
      } catch (error) {
        throw new Error('Error logging in user');
      }
    }, 
};

module.exports = root;