import React, {Component} from 'react';
import './AudioItem.css';


export default class AudioItem extends Component {
    constructor(props) {
        super(props);
       this.state={
        play: false,
        currentTime:0,





       }
       this.togglePlay=this.togglePlay.bind(this);
       this.stop=this.stop.bind(this)
       this.getTime=this.getTime.bind(this)

      }
       audio = new Audio(this.props.url)

       componentDidMount() {
        this.audio.addEventListener("timeupdate",  ()=> {
          let time = this.audio.get;
          this.setState({currentTime:time});
          console.log(time);
        })
        this.audio.addEventListener('ended', () => {
          // this.setState({ play: false })
          this.props.onFinishLoop();
        }
        );
      }
      
      // componentWillUnmount() {
      //   this.audio.removeEventListener('ended', () => this.setState({ play: false }));  
      // }
    componentDidUpdate(){
      if(this.props.play){
        this.audio.play();
      }
      // if(this.props.load){
      //   if(this.props.load!=this.state.play)
      //   this.setState({play:this.props.load})
      //           }
      if(this.props.stop)this.stop();
   
      

    }
    stop(){
if(this.state.play){
      this.audio.pause();
      this.audio.currentTime=0;
      console.log(this.audio.currentTime)
      this.setState({ play: false })
}
    }
      // shouldComponentUpdate(){
      //   this.props.play?this.audio.play(): this.audio.pause();
      
      // }

      togglePlay = () => {
        // this.setState({ play: !this.state.play }, () => {
        //   this.state.play ? this.audio.play() : this.audio.pause();
        // });
        this.setState({ play: !this.state.play }, () => {
          this.state.play ?  this.props.addAudio(this.props.index):this.stopInMiddel();
          
        });
      }
  stopInMiddel(){
    this.props.deleteAudio(this.props.index)
    this.audio.pause();
    this.audio.currentTime=0;
  }
   
getTime(){
  return this.audio.addEventListener
}

      render() {
     
     
    return (
      
    <div  className='audio'>

        <button className={this.state.play ? 'squers pause' : 'squers play'} id={this.props.index+''} onClick={this.togglePlay}>
        {/* <p className='p'>{this.audio.currentTime}</p> */}


        </button>

        <img id='icon' src={this.props.icon} onClick={this.togglePlay}/>
        {this.props.play? <div id='playing'></div>:''}
        {/* <div id='playing'></div> */}

    </div>

    );
  }
}
