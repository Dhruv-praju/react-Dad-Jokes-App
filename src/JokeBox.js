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
        return this.state.jokes.map(j => <Joke key={j.id} text={j.joke}/>)
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

            const jokes = await this.fetchNewJokes()
            // save to local storage
            // this.saveToLocalStorage(jokes)
            
            this.setState(st => ({
                page: st.page+1,
                jokes: jokes
            }))
        
    }
    handleClick = async ()=>{
        // fetch new jokes
        const newJokes = await this.fetchNewJokes()

        this.setState(st=>({
            page:  st.page + 1,
            jokes: [...st.jokes, ...newJokes]
        }))
    }
    render() {
        return (
            <div className="JokeBox">
                <div className="JokeBox-btnDiv">
                    <h1 className="heading">DAD JOKES</h1>
                        <i class="em-svg em-joy smiley" aria-role="presentation" aria-label="FACE WITH TEARS OF JOY"></i>
                    <button onClick={this.handleClick}>New Jokes</button>
                </div>
                <div className="JokeList">
                    {this.showJokes()}
                </div>
            </div>
        )
    }
}

export default JokeBox