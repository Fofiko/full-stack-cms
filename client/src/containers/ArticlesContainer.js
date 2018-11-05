import React, {Component, Fragment} from 'react';
import ArticlePreview from '../components/Article/ArticlePreview';
import ArticleFilter from '../components/Article/ArticleFilter';
import HomeNavBar from '../components/Home/HomeNavBar';

export default class ArticlesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            users: [],
            tags: [],
            filtered: false
        }
        this.handleFilters = this.handleFilters.bind(this); 
    }

    componentDidMount() {
        //fetch articles here
        fetch('/articles')
           .then(response => response.json())
           .then( (data) => this.setState({articles: data}))
           .then(() => this.filterInfo());
    }

    filterUsers() {
        const users = [];
        this.state.articles.map((article) => {
            if (!users.includes(article.user.name)) {
                return users.push(article.user.name)}
            return null;   
            }) 
        this.setState({users: users})
        
    }

    filterTags() {
        const tags = [];
        this.state.articles.map((article) => {
            
            if (!tags.includes(article.tag)) {
                return tags.push(article.tag)}  
            return null;      
        })
        this.setState({tags: tags})
    }

    filterInfo() {
        this.filterTags();
        this.filterUsers();
    }

    handleFilters(value) {
        
         console.log(value)
         
    }

    render() {
        return(
            <Fragment>
            <HomeNavBar/>
            <ArticleFilter userNames = {this.state.users} tags = {this.state.tags} onFilters = {this.handleFilters}/>
                <h4>Filter here linking to /articles/filtered, which will fetch from the backend component or in this container</h4>
                <ArticlePreview articles = {this.state.articles}/>
            </Fragment>
        );
    }
}