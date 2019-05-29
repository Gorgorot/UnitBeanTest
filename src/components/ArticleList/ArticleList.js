import React from 'react';
import { connect } from 'react-redux';

class Article extends React.Component{
    ReadArticle(){
        document.location.href = `/#/Article/Get/${this.props.index}`;
    }
    render(){
        return(            
            <div className="item" onClick = { this.ReadArticle.bind(this) }>
                <img src={ this.props.item.Image } alt=""/>
                <div className="header">
                    <div>
                        <span className="name">{ this.props.item.Title }</span>
                    </div>
                    <div>
                        <span className="date"> { this.props.item.Date }</span>
                    </div>                                
                </div>
                <div className="text">
                    { this.props.item.Description }
                </div>
            </div>
        );
    }
}

class ArticleList extends React.Component{
    render(){
        return(
            <div className="article-list">
                {
                    this.props.articles.map((item, index)=>
                        <Article key={ index } { ...{ item, index} } />    
                    )
                }
            </div>         
        );
    }
}

var mapStateToProps = state=>{
    return{
        articles: state ? state.get("articles") : []
    }
}

export default connect(mapStateToProps)(ArticleList);