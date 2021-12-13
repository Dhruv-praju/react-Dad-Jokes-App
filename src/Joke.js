import { Component } from "react";
import './Joke.css'

class Joke extends Component{
    state = {
        score:0
    }
    upVote = ()=>{
        this.setState(st=>{
            return {score: st.score+1}
        })
    }
    downVote = ()=>{
        this.setState(st=>{
            return {score: st.score-1}
        })
    }
    render() {
        let emoji='😕'
        if(this.state.score > 1){
            if(this.state.score < 4) emoji='🙂'
            else if(this.state.score < 6) emoji='😄'
            else if(this.state.score < 9) emoji='😆'
            else emoji='🤣'
        }
        else if(this.state.score < 0){
            emoji='😠'
        }
        return (
            <div className="Joke">
                <div className="Joke-VoteArea">
                    <i class="fas fa-arrow-up" onClick={this.upVote}></i>
                    <div className="circle">{this.state.score}</div>
                    <i class="fas fa-arrow-down" onClick={this.downVote}></i>
                </div>
                <p className="Joke-Text">{this.props.text}</p>
                <h1 className="Joke-Emoji">{emoji}</h1>
            </div>
        )
    }
}

export default Joke