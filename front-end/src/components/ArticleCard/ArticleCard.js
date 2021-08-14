import React from 'react';
import './ArticleCard.css';

function ArticleCard({imageURL, title, abstract, topic}) {
  const classString =  `topic topic-${topic}`;

  return (
    <article>
      <img src={imageURL} alt="" />
      <span className={classString}>{topic}</span>
      <h3><a href="">{title}</a></h3>
      <p>
        {abstract}
      </p>
  </article>
  )
}

export default ArticleCard;