import React from 'react';
import './ArticleSection.css';

import ShowcaseArticle from '../../components/ShowcaseArticle/ShowcaseArticle';
import ArticleGrid from '../../containers/ArticleGrid/ArticleGrid';

function ArticleSection() {
  return (
    <>
      <ShowcaseArticle
       imageURL="https://images.pexels.com/photos/130621/pexels-photo-130621.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
       title="Lorem ipsum dolor sit amet."
       abstract="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et ea
       impedit libero, beatae animi provident nesciunt molestias ipsam nemo ad."
       topic="science"
        />
        
      <ArticleGrid/>
    </>
  )

}

export default ArticleSection;
