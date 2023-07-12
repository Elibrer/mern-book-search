const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user.data._id })
          .select("-__v -password")
          .populate("savedBooks");
        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    getUsers: async () => {
      return User.find().populate("savedBooks");
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      if (!user) {
        throw new Error("Something is wrong!");
      }
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, args) => {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new Error("Wrong password!");
      }
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, args, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user.data._id },
            { $addToSet: { savedBooks: args.bookData } },
            { new: true, runValidators: true }
          );
          return updatedUser;
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      }
    },

    deleteBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user.data._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        );
        if (!updatedUser) {
          throw new Error("Couldn't find user with this id!");
        }
        return updatedUser;
      }
    },
  },
};

module.exports = resolvers;
