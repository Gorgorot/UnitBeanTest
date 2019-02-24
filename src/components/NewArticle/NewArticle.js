import React from 'react';
import './NewArticle.css';
import { Link } from 'react-router-dom';
import success from '../../assets/152.svg';


var SuccessMessage = ()=>{
    return(
        <div className="message">
            <img src = { success } alt=""/>
            <span>Поздравляем вас с успешным добавлением статьи в блог UnitBean!</span><br/>
            <Link to="/">К статьям</Link>
        </div>
    );
}

export default class NewArticle extends React.Component{
    constructor(props){
        super(props);
        this.createArticle = this.createArticle.bind(this);
        this.setButtonActive = this.setButtonActive.bind(this);
        this.state = {
            title: '',
            des: '',
            add_disabled: true,
            article_acreated: false
        }
    }
    setButtonActive(){        
        if(this.state.des==='is-valid' && this.state.title==='is-valid') this.setState({
            add_disabled: false
        })
        else this.setState({
            add_disabled: true
        })
    }
    validate(e){
        switch (e.target.id){
            case 'Title':{
                this.setState({
                    title: e.target.value.length>2 ? 'is-valid' : 'is-invalid'
                }, this.setButtonActive);
                break;
            }
            case 'Description':{
                this.setState({
                    des: e.target.value.length>2 ? 'is-valid' : 'is-invalid'
                }, this.setButtonActive);
                break;
            }
            default: break;
        }
    }
    createArticle(){
        var date = new Date();
        date = date.toLocaleString('ru', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }).replace(/\./,',').replace(/\sг\./,"");
        let fl = new FileReader();
        fl.onload = e=>{            
            let Article = {
                Title: document.querySelector('#Title').value,
                Description: document.querySelector('#Description').value,
                Date: date,
                Image: e.target.result
            }
            this.props.parentRefresh(Article);
            this.setState({
                article_acreated: true
            })
        }
        fl.readAsDataURL(document.querySelector("#Image").files[0]);
    }
    render(){
        if(this.state.article_acreated){
            return(
                <SuccessMessage />
            );
        }
        else
        return(
            <div className="article-form-container">
                <h2>Добавление статьи</h2>
                <div className="article-form">   
                    <div className="form-group">
                        <label htmlFor="Title">Заголовок</label>                        
                        <input className={ "form-control " + this.state.title } id="Title" type="text" onInput={ this.validate.bind(this) }/>
                    </div>    
                    <div className="form-group">
                        <label htmlFor="Description">Описание</label>         
                        <textarea className={ "form-control " + this.state.des } id="Description" rows="6" onInput={ this.validate.bind(this) } ></textarea>
                    </div>    
                    <label>Прикрепить изображение</label>
                    <div className="form-group btn-panel">
                        <label htmlFor="Image">
                        <input id="Image" type="file" />
                            <span className="camera"></span>
                        </label>
                        <div>
                            <Link className="cancel" to="/"></Link>
                            <button className="add" onClick = { this.createArticle } disabled={ this.state.add_disabled }></button>
                        </div>
                    </div>                    
                </div>
            </div>
        );
    }
}