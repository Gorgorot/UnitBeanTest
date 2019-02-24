import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import './Adaptee.css';
import ArticleListPage from './components/ArticleList/ArticleListPage';
import NewArticle from './components/NewArticle/NewArticle';
import Article from './components/Article/ArticlePage';
import './library/bootstrap-4.0.0-dist/css/bootstrap.min.css';
import articles from './articles';
import logo from './assets/logo.svg';
import add_article from './assets/add_article.svg';

class App extends Component {
  RefreshStore(Article){
    articles.push(Article);
  }
  GetArticle(Id){
    return articles[Id];
  }
  render() {
    return (
      <div className="page">
        <header>
            <div className="brand">
                <img src = { logo } alt="UnitBean" />
                <br/>
                <span className="article-count">Статьи, { articles.length }</span>
            </div>
            <Link to={ "/Article/Add" }>
              <div className="add-button">
                  <img src = { add_article } alt="Добавить статью"/>
              </div>
            </Link>            
        </header>
        <section>     
            <Switch>
              <Route exact path={ "/" } component={ ()=> <ArticleListPage articles={ articles } />}/> 
              <Route exact path={ "/Article/Add" } component={ ()=> <NewArticle parentRefresh={ this.RefreshStore.bind(this) } />}/> 
              <Route exact path={ "/Article/Get/:id/" } component={ Article } /> 
            </Switch>
        </section>
    </div>
    );
  }
}

export default App;
