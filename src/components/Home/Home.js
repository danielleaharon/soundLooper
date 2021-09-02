import React, { Component } from 'react';
import './Home.css';
import AudioItem from '../AudioItem/AudioItem';
import Trakc1 from '../../Audio/120_future_funk_beats_25.mp3';
import Trakc2 from '../../Audio/120_stutter_breakbeats_16.mp3';
import Trakc3 from '../../Audio/Bass Warwick heavy funk groove on E 120 BPM.mp3';
import Trakc4 from '../../Audio/electric guitar coutry slide 120bpm - B.mp3';
import Trakc5 from '../../Audio/FUD_120_StompySlosh.mp3';
import Trakc6 from '../../Audio/GrooveB_120bpm_Tanggu.mp3';
import Trakc7 from '../../Audio/MazePolitics_120_Perc.mp3';
import Trakc8 from '../../Audio/PAS3GROOVE1.03B.mp3';
import Trakc9 from '../../Audio/SilentStar_120_Em_OrganSynth.mp3';
import Drum from '../../Icons/drum.png';
import Drums from '../../Icons/drums.png';
import ElectricGuitar from '../../Icons/electricguitar.png';
import ElectricGuitar2 from '../../Icons/electricguitar2.png';
import Cymbal from '../../Icons/cymbal.png';
import Darbuka from '../../Icons/darbuka.png';
import Dj from '../../Icons/dj.png';
import Heartbeat from '../../Icons/heartbeat.png';
import Piano from '../../Icons/piano.png';
import DjPlay from '../../Icons/djplay2.png';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allAudio: [],
      playAudio: [],
      PendingAudio: [],
      Playing: true,
      isPlay: false,
      record: false,
      history: [],
      message: false,



    }
    this.onFinishLoop = this.onFinishLoop.bind(this);
    this.addAudio = this.addAudio.bind(this);
    this.deleteAudio = this.deleteAudio.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.Record = this.Record.bind(this);
    this.Load = this.Load.bind(this);
    this.message = this.message.bind(this);


  }

  componentDidMount() {
  
    var item = [];
    var src = Trakc1;
    var icon = Drum;
    item.push({ src, icon });
    src = Trakc2;
    icon = Heartbeat;
    item.push({ src, icon });
    src = Trakc3;
    icon = ElectricGuitar2;
    item.push({ src, icon });
    src = Trakc4;
    icon = ElectricGuitar;
    item.push({ src, icon });
    src = Trakc5;
    icon = Cymbal;
    item.push({ src, icon });
    src = Trakc6;
    icon = Darbuka;
    item.push({ src, icon });
    src = Trakc7;
    icon = Dj;
    item.push({ src, icon });
    src = Trakc8;
    icon = Drums;
    item.push({ src, icon });
    src = Trakc9;
    icon = Piano;
    item.push({ src, icon });



    this.setState({ allAudio: item })

  }
  message() {
    return (
      <Dialog
        open={this.state.message}
        onClose={() => this.setState({ message: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        id='dialog'
      >
        <DialogTitle className="alert-dialog">{"No requests"}</DialogTitle>
        <DialogContent className="alert-dialog">
          <DialogContentText >
          You must select which instruments to play
            <img id='dialog-img' src={DjPlay} alt='logo'/>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="alert-dialog">
          <Button onClick={() => this.setState({ message: false })} color="primary">
            Ok
          </Button>

        </DialogActions>
      </Dialog>
    )
  }
  async addAudio(track) {
  
    console.log('addAudio')
     const arr=[track];

    this.setState({ PendingAudio: this.state.PendingAudio.concat(arr) });
    

    if (this.state.record) {

      const hAdd = this.state.history;
      const action = 1;
      var time = new Date().getTime();

      hAdd.push({ action, track, time });
      this.setState({ history: hAdd })
    }

  }
  deleteAudio(track) {
    var index = this.state.PendingAudio.indexOf(track);
    var indexPlay = this.state.playAudio.indexOf(track);
    
    if(indexPlay!==-1){
       this.state.playAudio.splice(indexPlay, 1);
       this.setState({playAudio:this.state.playAudio})
       if( this.state.playAudio.length===0) this.stop();

      }

  else  if (index !== -1) {


      this.state.PendingAudio.splice(index, 1);
      this.setState({PendingAudio:this.state.PendingAudio})

      console.log(this.state.PendingAudio)

      if( this.state.PendingAudio.length===0) this.stop();

   
    }
    if (this.state.record) {
      const hDelete = this.state.history;
      const action = 2;
      var time = new Date().getTime();

      hDelete.push({ action, track, time });
      this.setState({ history: hDelete })
    }

  }
  onFinishLoop() {
    let PendingArr3 = this.state.PendingAudio;
    this.setState({ playAudio: PendingArr3 })
  }

  Record() {
    this.setState({ record: !this.state.record }, () => {
      if (this.state.record)
        this.setState({ history: [] });
    }
    )
  }
  async Load() {

    await this.stop();
    this.state.history.forEach((item, index) => {

      switch (item.action) {
        case 1:
          if (index !== 0) {
            setTimeout(() => {
              window.document.getElementById(item.track + '').click();
            }, item.time - this.state.history[0].time);
          }
          else window.document.getElementById(item.track + '').click()

          break;

        case 2:
          if (index !== 0) {

            setTimeout(() => {
              window.document.getElementById(item.track + '').click();
            }, item.time - this.state.history[0].time);
          }
          else window.document.getElementById(item.track + '').click()
          break;


        case 3:
          if (index !== 0) {

            setTimeout(() => { this.play(); }, item.time - this.state.history[0].time);

          }
          else this.play()
          break;


        case 4:
          if (index !== 0) {

            setTimeout(() => {
              this.stop();

            }, item.time - this.state.history[0].time);
          }
          else this.stop()
          break;

          default: break;

      }

    })


  }
  play() {

    if (this.state.PendingAudio.length === 0) {
      this.setState({ message: true })
      return;
    }
    this.setState({ Playing: true })
    if (!this.state.isPlay) {
      this.setState({ isPlay: true }, () => {
    
        this.setState({ playAudio: this.state.playAudio.concat(this.state.PendingAudio) })

      })
    }
    if (this.state.record) {
      let hPlay = this.state.history;
      const action = 3;
      const track = '';
      var time = new Date().getTime();

      hPlay.push({ action, track, time });
      this.setState({ history: hPlay })
    }
  }
  stop() {
    this.setState({ Playing: false })
    this.setState({ isPlay: false });
    this.setState({ playAudio: [] }, () => {
      this.setState({ Playing: true })

    });
    this.setState({ PendingAudio: [] });
    if (this.state.record) {
      let hStop = this.state.history;
      const action = 4;
      const track = '';
      var time = new Date().getTime();
      hStop.push({ action, track, time });
      this.setState({ history: hStop })
    }

  }
  render() {



    return (

      <div className='Home' style={{ height: (window.screen.height + 'px'), width: window.screen.width + 'px' }} >
        {this.message()}

        <p className='title' >SoIund <br />
          <span id='t-line2'><span className='t-first-letter'>L</span>ooper</span> </p>
          
        <button onClick={this.state.isPlay ? this.stop : this.play} className='play-btn' id={this.state.isPlay ? 'stopIcon' : 'playIcon'} >
          {this.state.isPlay ? <div id='btn-img' /> : ''}
        </button>

        <div id='squers-container'>
          <button className={this.state.record ? 'record btn-record-off' : 'record btn-record-start'} onClick={this.Record} ><span className='REC'>REC</span></button>
          <button hidden={this.state.history.length === 0 || this.state.record} className='btn-record-play' onClick={this.Load} ></button>
          {this.state.allAudio.map((item, index) => {
            return <AudioItem id={index} url={item.src} icon={item.icon} key={index} index={index} addAudio={this.addAudio} deleteAudio={this.deleteAudio} play={this.state.playAudio.includes(index) ? this.state.Playing : false} onFinishLoop={this.onFinishLoop} stop={!this.state.Playing} />
          })}
        </div>
        <br />
        <p id='by'>by Danielle Aharon</p>
      </div>

    );
  }
}
