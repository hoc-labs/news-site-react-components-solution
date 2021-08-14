process.env.DEBUG = 'mongo-seeding';
const { Seeder } = require('mongo-seeding');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const {mongoURI} = require('./config');

const config = {
  database: mongoURI,
  dropCollections: true,
  setTimestamps: true
};

const articleDocuments = [];
const topicDocuments = [
  {
    "_id": mongoose.Types.ObjectId("60d24e7cb4f2084cb4ee9505"),
    "name": "home",
    "title": "Home",
    "color": "",
    "showcaseArticle": ""
  },
  {
    "_id": mongoose.Types.ObjectId("60d24e7cb4f2084cb4ee9504"),
    "name": "technology",
    "title": "Technology",
    "color": "#009cff",
    "showcaseArticle": ""
  },
  {
    "_id": mongoose.Types.ObjectId("60d2506cb4f2084cb4ee9512"),
    "name": "science",
    "title": "Science",
    "color": "#3bd142",
    "showcaseArticle": ""
  },
  {
    "_id": mongoose.Types.ObjectId("60d24eb4b4f2084cb4ee9508" ),
    "name": "food",
    "title": "Food",
    "color": "#d1483b",
    "showcaseArticle": ""
  },
  {
    "_id": mongoose.Types.ObjectId("60d24ed6b4f2084cb4ee950a"),
    "name": "arts",
    "title": "Arts",
    "color": "#a66bbe",
    "showcaseArticle": ""
  },
  {
    "_id": mongoose.Types.ObjectId("60d24eecb4f2084cb4ee950c"),
    "name": "sports",
    "title": "Sports",
    "color": "#f99500",
    "showcaseArticle": ""
  }
];

async function getArticles (section) {
    
  const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=5Vd8O8baGS3WEG1eQVAaS2mG6K0VyHH8`)
  return response.data.results;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

async function initTopic(name) {
  const articles = await getArticles(name);
  const maxArticles = 12;
  const articleCount = articles.length>maxArticles?maxArticles:articles.length;

  const showcaseIndex = getRandomInt(0,articleCount-1);
  const topic = topicDocuments.find(x=>x.name===name);

  for (let i=0;i<articleCount;++i) {
    const article = articles[i];
    const articleId = mongoose.Types.ObjectId();
    if (i===showcaseIndex) {
      topic.showcaseArticle = mongoose.Types.ObjectId(articleId);
    }
    const imageURL = article.multimedia?article.multimedia.find(x=>x.format==='Normal').url:'';
    const jumboImageURL = article.multimedia?article.multimedia.find(x=>x.format==='superJumbo').url:'';

    // scrap the article html and build paragraphs for the article body
    const response = await axios.get(article.url);
    const $ = cheerio.load(response.data);

    let body = '';
    const paragraphs = $('section[name=articleBody]').find('p');
    for (let i = 0; i < paragraphs.length; i++) {
        const pText = '<p>' + $(paragraphs[i]).text() + '</p>';
        body+=pText;
    }

    articleDocuments.push({
      "_id": articleId,
      byline: article.byline,
      title:article.title,
      abstract:article.abstract,
      body:body,
      imageURL: imageURL,
      jumboImageURL: jumboImageURL,
      topic: mongoose.Types.ObjectId(topic._id)
    }); 
  }
}

async function seedDB() {
  const seeder = new Seeder(config);

  await initTopic('science');
  await initTopic('food');
  await initTopic('arts');
  await initTopic('sports');
  await initTopic('technology');
  await initTopic('home');

  try {
    await seeder.import([
            {name: 'topics', documents: topicDocuments},
            {name: 'articles', documents: articleDocuments},
          ]);
  } 
  catch (err) {
    console.log(err);
  }
}

seedDB();