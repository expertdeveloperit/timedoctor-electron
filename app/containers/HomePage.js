import React, { Component } from 'react';
import Home from '../components/Home';
import styles from './HomePage';


export default class HomePage extends Component {
	constructor(props){
		super(props);
		this.state={
			playing:false
		}
	}

	setStatus=(status) => {
		this.setState({playing:status});
	}
  render() {
    return(
			<div className={this.state.playing ? "status_play" : "status_stop"}>
				<div className="titlebar">
				<div className={styles.title}>
				 <span className={styles.titleSpan}><img src="../resources/timedoctor.svg"  className={styles.titleSpanImg} /></span>
				</div>
				</div>
				<Home {...this.props} setStatus={this.setStatus}/>;
				</div>
		)
  }
}
