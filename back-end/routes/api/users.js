const { request } = require('express');
const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({message: `Cannot find user with id: ${id}`});
    }

    res.send(user);
  }
  catch(err) {
    res.status(500).json({message:err.message});
  }
});

router.put('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({message: `Cannot find user with id: ${id}`});
    }

    user.username = req.body.username;
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.imageURL = req.params.imageURL;

    await user.save();
    res.status(201).json(user);
  }
  catch(err) {
    res.status(500).json({message:err.message});
  }
});

router.post('/', async (req, res) => {

  var user = new User({
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    imageURL: req.body.imageURL
  });

  try {
    const newUser =  await user.save();
    res.status(201).json(newUser);
  }
  catch (err) {
    res.status(400).json({message: err.message})
  }
});

module.exports = router;