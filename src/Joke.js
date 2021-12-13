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
    getColor(){
        const {score} = this.state
        if(score>=14) return '#4CAF50'
        else if(score >= 12) return '#8BC34A' 
        else if(score >= 9) return '#CDDC39' 
        else if(score >= 6) return '#FFEB3B' 
        else if(score >= 3) return '#FFC107' 
        else if(score >= 0) return '#FF9800' 
        else  return '#F44336' 
    }
    getEmoji(){
        const {score} = this.state
        if(score>=11) return 'em-rolling_on_the_floor_laughing'
        else if(score >= 8) return 'em-laughing' 
        else if(score >= 6) return 'em-grinning' 
        else if(score >= 2) return 'em-slightly_smiling_face' 
        else if(score >= 0) return  'em-neutral_face'
        else if(score >= -2) return 'em-slightly_frowning_face'
        else  return 'em-angry' 
    }
    render() {
        return (
            <div className="Joke">
                <div className="Joke-VoteArea">
                    <i class="fas fa-arrow-up" onClick={this.upVote}></i>
                    <div className="circle" style={{border: `3px solid ${this.getColor()}`}}>{this.state.score}</div>
                    <i class="fas fa-arrow-down" onClick={this.downVote}></i>
                </div>
                <p className="Joke-Text">{this.props.text}</p>
                <i class={`em ${this.getEmoji()} Joke-Emoji`} aria-role="presentation" aria-label="HUSHED FACE"></i>
            </div>
        )
    }
}

export default Joke