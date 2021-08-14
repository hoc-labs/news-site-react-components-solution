const mongoose = require('mongoose');
const router = require('express').Router();
const Topic = mongoose.model('Topic');

router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.get('/:topicId', getTopic, async (req, res) => {
  res.send(res.topic);
});

router.post('/', async (req, res) => {

  var topic = new Topic({
    name: req.body.name,
    title: req.body.title,
    color: req.body.color,
  });

  try {
    const newTopic =  await topic.save();
    res.status(201).json(newTopic);
  }
  catch (err) {
    res.status(400).json({message: err.message})
  }
});


async function getTopic(req, res, next) {
  let topic = null;
  const id = req.params.topicId;
  try {
    const topic = await Topic.findById(id);
    if (topic === null) {
      return res.status(404).json({message: `Cannot find topic with id: ${id}`});
    }

    res.topic = topic;
  }
  catch (err) {
    return res.status(500).json({message:err.message});
  }

  next();
}

module.exports = router;