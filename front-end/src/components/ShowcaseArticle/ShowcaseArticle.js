import React from 'react';
import './ShowcaseArticle.css';

function ShowcaseArticle({topic, title, abstract, imageURL}) {
  return (
    <>
      <section style={{background: `url(${imageURL}) center/cover`}} className="showcase">
        <span className="topic topic-technology">{topic}</span>
        <h1>{title}</h1>
        <p>{abstract}</p>
        <a href="" className="btn">Learn More</a>
    </section>
    </>
  )
}

export default ShowcaseArticle;