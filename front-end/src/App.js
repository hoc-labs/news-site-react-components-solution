import React from 'react';
import './App.css';

import Footer from './containers/Footer/Footer';
import Header from './containers/Header/Header';
import ArticleSection from './containers/ArticleSection/ArticleSection';

function App() {
  return (
    <>
    <main>
      <Header/>
      <ArticleSection/>
      <Footer/>
    </main>
    </>  
  );
}

export default App;
