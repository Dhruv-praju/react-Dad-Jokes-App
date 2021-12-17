import { Component } from "react";
import {v4 as uuid} from 'uuid'
import axios from 'axios'
import Joke from "./Joke";
import './JokeBox.css'

/**
 * if no jokes in local storage, then fetch jokes from API.
 * if their are jokes in Local storage, then use those
 */
class JokeBox extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            page:0,
            jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),    // load jokes if they are present in local storage
            loading: false
        }

    }
    showJokes(){
        return this.state.jokes.map(j => <Joke key={j.id} id={j.id} text={j.joke} score={j.score} upVote={this.upVote} downVote={this.downVote}/>)
    }
    async fetchNewJokes(){
        // fetches 10 new jokes and return its array
        try {
            let config = {
                headers:{
                    'Accept':'application/json'
                },
                params:{
                    limit:10,
                    page:(this.state.page+1)
                }
            }
            const response = await axios.get('https://icanhazdadjoke.com/search', config)
            const jokes = response.data.results
            return jokes.map(j =>( {...j, id:uuid(), score:0}) )

        } catch (e) {
            alert('ERROR : '+e)
            throw e
        }

    }
    async componentDidMount(){
        if(! this.state.jokes.length){     // if their are no jokes
            try {
                this.setState({loading: true})
                // fetch 10 jokes as user refreshes
                const jokes = await this.fetchNewJokes()
    
                this.setState(st => ({
                    page: st.page+1,
                    jokes: jokes,
                    loading: false
                }))
            
                // save it to local storage
                window.localStorage.setItem('jokes', JSON.stringify(jokes))                
                
            } catch (e) {
                alert('SORRY FOR NO JOKES!, PLEASE CHECK INTERNET CONNECTION')
            }
    
        } 
    }
    handleClick = async ()=>{
        this.setState({loading: true})
        // fetch new jokes
        const newJokes = await this.fetchNewJokes()

        this.setState(st=>({
            page:  st.page + 1,
            jokes: [...st.jokes, ...newJokes],
            loading: false
        }))
    }
    upVote = (id)=>{

        const newJokes = this.state.jokes.map(j=>{
            if(j.id===id) j.score = j.score+1
            return j
        })

        this.setState({jokes: newJokes})
    }
    downVote = (id)=>{
        const newJokes = this.state.jokes.map(j=>{
            if(j.id===id) j.score = j.score-1
            return j
        })

        this.setState({jokes: newJokes})
    }
    componentDidUpdate(){
        // sync local storage with current state of jokes
        window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    }
    render() {
        return (
            <div className="JokeBox">
                <div className="JokeBox-sidebar">
                    <h1 className="heading">Dad <span>Jokes</span></h1>
                        <i className="em-svg em-joy smiley"></i>
                    <button className="getMore-btn" onClick={this.handleClick}>New Jokes</button>
                </div>
                <div className="JokeList">
                    
                    {(this.state.loading) 
                    ? 
                    <div className="JokeBox-spinner">
                        <i className="far fa-5x fa-laugh fa-spin"/>
                        <h1 className="">Loading...</h1>
                    </div>
                     : 
                     this.showJokes()}
                </div>
            </div>
        )
    }
}

export default JokeBox