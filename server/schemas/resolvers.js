const { AuthenticationError } = require('apollo-server-express');
const { User, Trip} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password').populate('trips');
            // .populate('savedBooks')
  
          return userData;
        }
        throw new AuthenticationError('Not logged in');
    }
},
  
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    checkUsername: async (parent, {username})=>{
      const checker = await User.findOne({ username });
      if (checker) return true;
      else return false
    },
    checkEmail: async (parent, {email})=>{
      const checker = await User.findOne({ email });
      if (checker) return true;
      else return false
    },
    
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addTrip: async (parent, {tripData}, context) => {
      // console.log(context);
      if (context.user){
        const newTrip = await Trip.create({...tripData});

        const updatedUser = await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$push: {trips: newTrip._id}},
          {new: true}
        ).populate('trips');
        return updatedUser;
      }

      throw new AuthenticationError('You needed to be logged in');
    }
  }
};

module.exports = resolvers;
