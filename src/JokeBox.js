import { Component } from "react";
import axios from 'axios'
import Joke from "./Joke";
import './JokeBox.css'

class JokeBox extends Component{
    state = {
        page:0,
        jokes:[]
    }
    showJokes(){
        return this.state.jokes.map(j => <Joke key={j.id} id={j.id} text={j.joke} score={j.score} upVote={this.upVote} downVote={this.downVote}/>)
    }
    saveToLocalStorage(jokes){
        const n = localStorage.length
        jokes.forEach((j,idx) => localStorage.setItem(idx+n, JSON.stringify(j)))
    }
    async fetchNewJokes(){
        // fetches 10 new jokes and return its array
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
        return response.data.results

    }
    async componentDidMount(){
        // fetch 10 jokes as user refreshes

            const jokes = (await this.fetchNewJokes()).map(j =>( {...j,score:0}) )

            this.setState(st => ({
                page: st.page+1,
                jokes: jokes
            }))
        
    }
    handleClick = async ()=>{
        // fetch new jokes
        const newJokes = (await this.fetchNewJokes()).map(j =>( {...j,score:0}) )

        this.setState(st=>({
            page:  st.page + 1,
            jokes: [...st.jokes, ...newJokes]
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
    render() {
        return (
            <div className="JokeBox">
                <div className="JokeBox-sidebar">
                    <h1 className="heading">Dad <span>Jokes</span></h1>
                        <i className="em-svg em-joy smiley"></i>
                    <button className="getMore-btn" onClick={this.handleClick}>New Jokes</button>
                </div>
                <div className="JokeList">
                    {this.showJokes()}
                </div>
            </div>
        )
    }
}

export default JokeBox