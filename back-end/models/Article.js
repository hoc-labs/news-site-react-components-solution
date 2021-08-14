const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    topic: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Topic' ,
      required: true,
    },
    title: {
      type: String,
      required: [true, "can't be blank"],
    },
    abstract: {
      type: String,
      required: [true, "can't be blank"],
    },
    body: {
      type: String,
      required: [true, "can't be blank"]
    },
    byline:String,
    imageURL: String,
    jumboImageURL: String
  }
);

mongoose.model("Article", ArticleSchema);
