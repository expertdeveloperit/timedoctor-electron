import React, { Component } from 'react';
import {SecondsTohhmmss} from './SecondsTohhmmss'
import Play from './Play'
import Pause from './Pause'
import Menu from './Menu'
import Close from './Close'
import styles from './Timer.css';
const remote = require('electron').remote;
let offset = null, interval = null


const RenderHours=(props) => {
  let firstIndex;
  let secondIndex;
  if(props.time){
      firstIndex=props.time[0];
      secondIndex=props.time[1];
  }
return(
  <div>
        <div className={props.hide == undefined?'flip':'flip hide'}>
          {firstIndex}
        </div>
        <div className={props.hide == undefined?'flip':'flip hide'}>
         {secondIndex}
        </div>
  </div>
  )
}

const RenderSeperator=(props) => {
  const hide="";
  console.log("hide class",props.hide);

  return(
      <div className={props.hide == undefined?'flip-seperator':'flip-seperator hide'}>
         :
      </div>
  )
}

export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = { clock: 0, time: '00:00:00',playing:false }
  }

  componentWillUnmount() {
    this.pause()
  }

  componentDidMount(){
    if(localStorage.getItem('reduxState')){
      const reduxState=JSON.parse(localStorage.getItem('reduxState'))
      if(reduxState.playing){
        this.setState({clock:reduxState.clock});
        this.play();
      }
    }
  }


  pause=() => {
    if (interval) {
      this.props.setStatus(false);
      this.setState({playing:false});
      clearInterval(interval)
      interval = null
      this.props.saveLog("stop");
    }
  }

  play=() => {
    if (!interval) {
      this.props.setStatus(true);
      this.setState({playing:true});
      offset = Date.now()
      interval = setInterval(this.update, this.props.options.delay)
      this.props.saveLog("start");
    }
  }

  update=() => {
    let clock = this.state.clock
    console.log("update clock",this.state.clock);
    clock += this.calculateOffset()
    this.setState({clock: clock })
    let time = SecondsTohhmmss(clock / 1000)
    this.props.updateTimer({time,clock});
    this.setState({time: time })
  }

  calculateOffset() {
    let now = Date.now()
    let newOffset = now - offset
    offset = now
    return newOffset
  }

  handleMaximize=() => {
  let window = remote.getCurrentWindow();
    console.log(window);
  }

  handleClose=() => {
    var win = remote.getCurrentWindow();
    win.close();
  }

  render() {
  console.log(this.props);
  const hide="hide";
  const time=this.state.time.split(':');
    return (

      <div className="timer">
      <div className={styles.timerWrapper}>
      <div className="minimize">
        <div className="maximize" id="max-button">
        <Menu/>
        </div>
        <div className="ctrl-buttons">
        <button className={this.state.playing ? "stop" : "play"} onClick={this.state.playing ? this.pause : this.play}>
          {this.state.playing ? <Pause/> : <Play/>}
        </button>

        </div>
        <div className={this.state.playing ? "status online" : "status offline"}>
          <i className="fa fa-circle"></i>
        </div>
      </div>
      <RenderHours time={time[0]}/>
      <RenderSeperator/>
      <RenderHours time={time[1]}/>
      <RenderSeperator hide={hide}/>
      <RenderHours hide ={hide} time={time[2]}/>
        <div className="ctrl-buttons desktop">
        <button className={this.state.playing ? "stop" : "play"} onClick={this.state.playing ? this.pause : this.play}>
          {this.state.playing ? <Pause/> : <Play/>}

        </button>
        </div>
        <div className="cross" onClick={this.handleClose}>
        <Close/>
        </div>
      </div>




    </div>
    )
  }
}
