// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
const uuidv4 = require('uuid/v4');
var _ = require('lodash');
import moment from 'moment';
import styles from './Home.css';
import Timer from './Timer';

export default class Home extends Component {

constructor(props){
  super(props);
}

componentDidMount(){
  if(!window.sessionStorage.getItem("uuid")){
    window.sessionStorage.setItem("uuid",uuidv4());
  }
}
  saveLog=(operation) => {
    const uuid=window.sessionStorage.getItem("uuid");
    const timestamp=moment();
  	this.props.saveTimeLog({uuid,operation,timestamp});
  }

  render() {
      const {
      saveTimeLog,
      updateTimer,
    	tracker
      } = this.props;

      const {timer}=tracker;
      const time=timer.split(':');
      let hour=parseInt(time[0]);
      let minute=parseInt(time[1]);
      let displayTime;
      if(hour>0){
        displayTime=`${hour} h`;
      }else{
        displayTime=`${minute} m`;
      }

  	let OPTIONS = { prefix: 'seconds elapsed!', delay: 100}
    return (
      <div className={styles.container} data-tid="container">
		<Timer options={OPTIONS} saveLog={this.saveLog} updateTimer={updateTimer} setStatus={this.props.setStatus}/>
		<div className="workHistory">
    <h5 className="workHistoryheading">Work Today: {displayTime}</h5>
    <h5>Company Time: 10:24 PM GMT+08:00</h5>
		</div>
      </div>
    );
  }
}
