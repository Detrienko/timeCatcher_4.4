import React, { Component } from 'react';
import Button from "../../components/Button/Button";
import "./CountDown.css";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/businessBuilder';


class CountDown extends Component {

	state = {
  		timerOn: false,
	} 

  constructor(props){ 
    super(props);

    this.index = this.props.business.findIndex((el)=>el.id==this.props.businessData.id);

    this.countDownId = this.props.businessData.id;
    this.timerTime = this.props.business[this.index].timerTimeCountDown;    
    this.seconds = this.props.business[this.index].currentCountdownTime.seconds
    this.minutes = this.props.business[this.index].currentCountdownTime.minutes
    this.hours =   this.props.business[this.index].currentCountdownTime.hours 
  }

  shouldComponentUpdate(){

    this.index = this.props.business.findIndex((el)=>el.id==this.props.businessData.id);

    this.countDownId = this.props.businessData.id;
    this.timerTime = this.props.business[this.index].timerTimeCountDown;    
    this.seconds = this.props.business[this.index].currentCountdownTime.seconds
    this.minutes = this.props.business[this.index].currentCountdownTime.minutes
    this.hours =   this.props.business[this.index].currentCountdownTime.hours 
    return true;
  }

		startTimer = () => {
  			this.setState({
    			timerOn: true,
  			});

	  		this.timer = setInterval(() => {
	    		const newTime = this.timerTime - 10;
	    			if (newTime >= 0) {
              this.props.saveTimerTime(newTime, this.props.businessData.id)
	    			} else {
	      				clearInterval(this.timer);
	      				this.setState({ timerOn: false });
	      				alert("Countdown ended");
			    }

    this.props.saveTimerTime(this.timerTime, this.props.businessData.id)

			}, 10);
		}

		stopTimer = () => {
  			clearInterval(this.timer);
  			this.setState({ timerOn: false });
		}

		resetTimer = () => {
  			if (this.state.timerOn === false) {
    			this.setState({
     				timerTime: 0
   			 	});
          this.props.clearCurrentCountDownTime(this.props.businessData.id);
  			}
		}

    adjustTimer = input => {
        const { timerOn } = this.state;
        const timerTime = this.timerTime;
        const max = 216000000;

        if (!timerOn) {
          if (input === "incHours" && timerTime + 3600000 < max) {
            this.props.saveTimerTime(timerTime+3600000, this.countDownId)
          } else if (input === "decHours" && timerTime - 3600000 >= 0) {
            this.props.saveTimerTime(timerTime-3600000, this.countDownId)
          } else if (input === "incMinutes" && timerTime + 60000 < max) {
            this.props.saveTimerTime(timerTime+60000 , this.countDownId)
          } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
            this.props.saveTimerTime(timerTime-60000,this.countDownId)
          } else if (input === "incSeconds" && timerTime + 1000 < max) {
            this.props.saveTimerTime(timerTime+1000, this.countDownId)
          } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
            this.props.saveTimerTime(timerTime-1000, this.countDownId)
          }
        }
    }


		render(){

    const timerOn = this.state;
    const timerTime = this.timerTime;

    let seconds = this.seconds;
    let minutes = this.minutes;
    let hours = this.hours;
    let countdown = null;


    if(this.props.isShown){
    countdown = 
      <div className="Countdown">
        <div className="Countdown-header">Countdown</div>
        <div className="Countdown-display">
          <Button clicked={() => this.adjustTimer("incHours")}>&#8679;</Button>
          <Button clicked={() => this.adjustTimer("incMinutes")}>
            &#8679;
          </Button>
          <Button clicked={() => this.adjustTimer("incSeconds")}>
            &#8679;
          </Button>

          <div className="Countdown-time">
            <span>{hours}</span>
            <span> : &nbsp;</span>
            <span>{minutes}
            </span>
            <span> : &nbsp;</span>
            <span>{seconds}</span>
          </div>

          <Button clicked={() => this.adjustTimer("decHours")}>&#8681;</Button>
          <Button clicked={() => this.adjustTimer("decMinutes")}>
            &#8681;
          </Button>
          <Button clicked={() => this.adjustTimer("decSeconds")}>
            &#8681;
          </Button>
        <div className="Countdown-label">
          <span className="Countdown-label_hours">Hours</span>
          <span className="Countdown-label_minutes">Minutes</span>
          <span className="Countdown-label_seconds">Seconds</span>
        </div>
        </div>

        {this.state.timerOn === false && (
          <Button className="Button-start" clicked={this.startTimer}>
            Start
          </Button>
        )}
        {this.state.timerOn === true && timerTime >= 1000 && (
          <Button className="Button-stop" clicked={this.stopTimer}>
            Stop
          </Button>
        )}

            <Button className="Button-reset" clicked={this.resetTimer}>
              Reset
            </Button>

      </div>      
    }

    return (
      <div>
        {countdown}
      </div>
    );
  }
}

  const mapStateToProps = state => {
    return {
      business: state.businessList.business,
    }
  }

  const mapDispatchToProps = dispatch => {
    return{
      saveTimerTime: (timerTime, id) => dispatch(actions.saveTimerTime(timerTime, id)),
      clearCurrentCountDownTime: (id) => dispatch(actions.clearCurrentCountDownTime(id))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(CountDown);