import React from 'react';
import man from '../../assets/man.svg';
import { connect } from 'react-redux';
import actions from './redux/actions';
import AllComments from '../../comments';

class Comment extends React.Component{
    render(){
        return(
            <div className="comment-container">
                <div className="inline">                      
                    <img src={ man } />                  
                    <div className="comment">
                        <h5>{ this.props.Author}</h5>
                        <span className="date">{ this.props.Date }</span>
                        <div>{ this.props.Text }</div>
                    </div>
                </div>
            </div>
        );
    }
}
    

class CommentsPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Text: '',
            Author_name: '',
            Add_disabled: true
        }
    }
    CreateComment(){
        let date = new Date();
        date = date.toLocaleString('ru',{
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }).replace(/\sг\./, "");
        let newComment = {
            Author: document.querySelector('#Author-name').value,
            Text: document.querySelector('#Text').value,
            Date: date,
            Index: this.props.ArticleId
        };
        document.querySelector('#Author-name').value = "";
        document.querySelector('#Text').value = "";
        this.setState({
            Text: '',
            Author_name: '',
            Add_disabled: true
        })
        this.props.AddComment({newComment});
        AllComments.push(newComment);
    }
    setButtonActive(){        
        if(this.state.Text==='is-valid' && this.state.Author_name==='is-valid') this.setState({
            Add_disabled: false
        })
        else this.setState({
            Add_disabled: true
        })
    }
    validate(e){
        switch (e.target.id){
            case 'Text':{
                this.setState({
                    Text: e.target.value.length>2 ? 'is-valid' : 'is-invalid'
                }, this.setButtonActive);
                break;
            }
            case 'Author-name':{
                this.setState({
                    Author_name: e.target.value.length>2 ? 'is-valid' : 'is-invalid'
                }, this.setButtonActive);
                break;
            }
            default: break;
        }
    }
    render(){
        console.log(this.props)
        return(
            <div>
                <div className="form-group inline">                      
                    <img src={ man } />                  
                    <input type="text" id="Author-name" className={ "form-control " + this.state.Author_name } placeholder="Ваше имя" onChange={ this.validate.bind(this) }/> 
                </div>
                <div className="form-group inline">
                    <input type="text" id="Text" className={ "form-control " + this.state.Text }  placeholder="Ваш комментарий" style={{ marginLeft: '80px' }} onChange={ this.validate.bind(this) }/>                    
                    <button className="send" disabled={ this.state.Add_disabled } onClick={ this.CreateComment.bind(this) }></button>
                </div>
                {
                    this.props.comments ?
                    this.props.comments.map(item=>
                        <Comment { ...item } />
                    )
                    : null
                }
            </div>                
        );
    }
}


var mapStateToProps = state=>{
    return{
        comments: state ? state.get('comments') : []
    }
}

export default connect(mapStateToProps, actions)(CommentsPage);
