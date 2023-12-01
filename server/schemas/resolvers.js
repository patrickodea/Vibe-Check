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
    createUser: async (parent, { email, password,  }) => {
      console.log(email, password);
      const user = await User.create({ email, password });

      if (!user.email) {
        throw new Error('Failed to create user with non-null email');
      }

      const token = signToken(user);
      return { token, email: user.email };
    },
    loginUser: async (parent, { email, password }) => {
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
   
  }
;

module.exports = resolvers;