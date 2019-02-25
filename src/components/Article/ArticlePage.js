import React from 'react';
import articles from '../../articles';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CommentsPage from '../Comments/CommentsPage';
import reducer from '../Comments/redux/reducer';
import './Article.css';
import AllComments from '../../comments';

var store = createStore(reducer);


export default class Article extends React.Component{
    componentDidMount(){
        var comments = AllComments.filter(item=>{
            return item.Index==this.props.match.params.id;
        })     
        store.dispatch({
            type: 'SET_STATE',
            state: {
                comments: comments
            }
        })
    }
    render(){
        return(
            <div>
                <img className="article-img" src={ articles[this.props.match.params.id].Image }/>
                <div className="article-text">
                    { articles[this.props.match.params.id].Description }
                </div>
                <Provider store={ store }>
                    <CommentsPage ArticleId= { this.props.match.params.id }/>
                </Provider>
            </div>
        );
    }
}