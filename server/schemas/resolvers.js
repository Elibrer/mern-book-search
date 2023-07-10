const { User } = require("../models");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select("-__v -password")
            .populate("savedBooks");
            
          return userData;
        }
      },
    getUsers: async () => {
        return User.find().populate("savedBooks");
    },
    getSingleUser: async (parent, { user = null, args }) => {
        const foundUser = await User.findOne({
          $or: [
            { _id: user ? user._id : args.id },
            { username: args.username },
          ],
        });
  
        if (!foundUser) {
          throw new Error("Cannot find a user with this id!");
        }
  
        return foundUser;
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

      login: async (parent, { body }) => {
        const user = await User.findOne({
          $or: [{ username: body.username }, { email: body.email }],
        });
        if (!user) {
          throw new Error("Can't find this user");
        }
    
        const correctPw = await user.isCorrectPassword(body.password);
    
        if (!correctPw) {
          throw new Error("Wrong password!");
        }
        const token = signToken(user);
        return { token, user };
      },

      saveBook: async (parent, { user, body }) => {
        console.log(user);
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $addToSet: { savedBooks: body } },
            { new: true, runValidators: true }
          );
          return updatedUser;
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      },

      deleteBook: async (parent, { user, params }) => {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: { bookId: params.bookId } } },
          { new: true }
        );
        if (!updatedUser) {
          throw new Error("Couldn't find user with this id!");
        }
        return updatedUser;
      },
  },
};

module.exports = resolvers;
