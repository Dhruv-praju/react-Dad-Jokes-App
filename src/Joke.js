import { Component } from "react";
import './Joke.css'

class Joke extends Component{
    handleUpVote = ()=>{
        this.props.upVote(this.props.id)
    }
    handleDownVote = ()=>{
        this.props.downVote(this.props.id)
    }
    getColor(){
        const {score} = this.props
        if(score>=10) return '#4CAF50'
        else if(score >= 8) return '#8BC34A' 
        else if(score >= 6) return '#CDDC39' 
        else if(score >= 4) return '#FFEB3B' 
        else if(score >= 2) return '#FFC107' 
        else if(score >= 0) return '#FF9800' 
        else  return '#F44336' 
    }
    getEmoji(){
        const {score} = this.props
        if(score>=11) return 'em-rolling_on_the_floor_laughing'
        else if(score >= 8) return 'em-laughing' 
        else if(score >= 6) return 'em-grinning' 
        else if(score >= 2) return 'em-slightly_smiling_face' 
        else if(score >= 0) return  'em-neutral_face'
        else if(score >= -2) return 'em-confused'
        else  return 'em-angry' 
    }
    render() {
        return (
            <div className="Joke">
                <div className="Joke-VoteArea">
                    <i className="fas fa-arrow-up" onClick={this.handleUpVote}></i>
                    <div className="circle" style={{border: `3px solid ${this.getColor()}`}}>{this.props.score}</div>
                    <i className="fas fa-arrow-down" onClick={this.handleDownVote}></i>
                </div>
                <p className="Joke-Text">{this.props.text}</p>
                <i className={`em ${this.getEmoji()} Joke-Emoji`}></i>
            </div>
        )
    }
}

export default Joke