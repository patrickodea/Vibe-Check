const User = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth');
const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { email }) => {
      return User.findOne({ email });
    },
    userExists: async (parent, { email }) => {
      return User.findOne({ email });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    createUser: async ({ email, password, spotifyAccountLink }) => {
      const user = await User.create({ spotifyAccountLink, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // userExists: async ({ email }) => {
    //     try {
    //       const user = await User.findOne({ email: email });
    //       return Boolean(user);
    //     } catch (error) {
    //       throw new Error('Error checking if user exists');
    //     }
    // },
    loginUser: async ({ email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    }, 
  }
};

module.exports = resolvers;