const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    color: String,
    showcaseArticle: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }
  }
);

mongoose.model("Topic", TopicSchema);
