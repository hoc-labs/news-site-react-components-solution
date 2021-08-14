const mongoose = require('mongoose');
const router = require('express').Router();
const Article = mongoose.model('Article');
const Comment = mongoose.model('Comment');
const Topic = mongoose.model('Topic');

router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    for (let i=0; i<articles.length;++i) {
      await populateArticle(articles[i]);
    }

    res.json(articles);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.get('/:articleId', getArticle, async (req, res) => {
  await populateArticle(res.article);
  res.send(res.article);
});

router.put('/:articleId', getArticle, async (req, res) => {
  try {
    const article = res.article;

    article.title = req.body.title;
    article.abstract = req.body.abstract;
    article.imageURL = req.body.imageURL;
    article.body = req.body.body;
   
    await article.save();
    await populateArticle(article);
    res.status(201).json(article);
  }
  catch(err) {
    res.status(500).json({message:err.message});
  }
});

router.post('/', async (req, res) => {

  var article = new Article({
    title: req.body.title,
    abstract: req.body.abstract,
    body: req.body.body,
    imageURL: req.body.imageURL,
    author: req.body.authorId
  });

  try {
    await article.save();
    await populateArticle(res.article);
    res.status(201).json(article);
  }
  catch (err) {
    res.status(400).json({message: err.message})
  }
});


router.get('/topic/:topicId', async (req, res) => {
  try {
    const articles = await Article.find({topic: req.params.topicId});
    for (let i=0; i<articles.length;++i) {
      await populateArticle(articles[i]);
    }

    res.json(articles);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.get('/:articleId/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ article: req.params.articleId });
    res.send(comments);
  }
  catch(err) {
    res.status(500).json({message:err.message});
  }
});

router.post('/:articleId/comments', async (req, res) => {
  try {
    const comment = new Comment({
      author: req.body.authorId,
      article: req.params.articleId,
      body: req.body.body,
    });
  
    await comment.save();
    res.status(201).json(comment);
  }
  catch(err) {
    res.status(500).json({message:err.message});
  }
});

/********************************* helers     *********************************/

async function populateArticle(article) {
  await article
  .populate('author')
  .populate('topic')
  .execPopulate();
}

/********************************* middleware *********************************/

async function getArticle(req, res, next) {
  let article = null;
  const id = req.params.articleId;
  try {
    const article = await Article.findById(id);
    if (article === null) {
      return res.status(404).json({message: `Cannot find article with id: ${id}`});
    }

    res.article = article;
  }
  catch (err) {
    return res.status(500).json({message:err.message});
  }

  next();
}

module.exports = router;