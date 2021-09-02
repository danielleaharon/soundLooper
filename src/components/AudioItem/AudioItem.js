import React, { Component } from 'react';
import './AudioItem.css';


export default class AudioItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      currentTime: 0,

    }
    this.togglePlay = this.togglePlay.bind(this);
    this.stop = this.stop.bind(this)

  }
  audio = new Audio(this.props.url)

  componentDidMount() {
    this.audio.addEventListener('ended', () => {
      this.props.onFinishLoop();
    }
    );
  }


  componentDidUpdate() {
    if (this.props.play&&this.state.play) { 
      this.audio.play();
     }

    if (this.props.stop) this.stop();

  }
  stop() {
    if (this.state.play) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.setState({ play: false })
    }
  }


  togglePlay = () => {

    this.setState({ play: !this.state.play }, () => {
      this.state.play? this.props.addAudio(this.props.index) : this.stopInMiddel();

    });
  }
  stopInMiddel() {
    this.props.deleteAudio(this.props.index)
    this.audio.pause();
    this.audio.currentTime = 0;
  }


  render() {


    return (

      <div className='audio'>

        <button className={this.state.play ? 'squers pause' : 'squers play'} id={this.props.index + ''} onClick={this.togglePlay}>

        </button>

        <img id='icon' src={this.props.icon} onClick={this.togglePlay} alt='icon' />
        {this.props.play&&this.state.play ? <div id='playing'></div> : ''}

      </div>

    );
  }
}
