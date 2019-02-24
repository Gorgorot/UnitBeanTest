import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducer';
import ArticleList from './ArticleList';
import './ArticleList.css';

var store = createStore(reducer);


export default class ArtilcleListPage extends React.Component{
    componentWillMount(){     
        store.dispatch({
            type: 'SET_STATE',
            state: {
                articles: this.props.articles
            }
        })
    }
    render(){
        return(
            <Provider store = { store }>
                <ArticleList />
            </Provider>
        )
    }
}