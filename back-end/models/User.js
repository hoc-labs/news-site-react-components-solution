const  mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String, 
    lowercase: true, 
    required: [true, "can't be blank"], 
  },
  email: {
    type: String, 
    lowercase: true, 
    required: [true, "can't be blank"],
  },
  firstName: {
    type: String,
    required: [true, "can't be blank"], 
  },
  lastName: {
    type: String,
    required: [true, "can't be blank"], 
  },
  imageURL: {
    type: String,
  }
});

mongoose.model('User', UserSchema);
