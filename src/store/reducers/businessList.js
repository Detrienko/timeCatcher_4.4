import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';


const initialState = {
	business: [
		{	
			id: 0,
			title: 'English',
			hours: 266,
			goalHours: 15000,
			description: 'Read something',
			progress: 0,
			isShown: true,
			stopWatchIsShown: true,
			countDownIsShown: false,
			currentStopwatchTime: {
				hours: '00',
				minutes: '00',
				seconds: '00',
				centiseconds: '00'
			},
			currentCountdownTime: {
        		hours: '00',
        		minutes: '00',
        		seconds: '00',
     		},
      		timerTime: '',
      		timerTimeCountDown: 0
		},
		{
			id: 1,
			title: 'Programming',
			goalHours: 15000,
			hours: 23,
			description: 'PROGRAMMING!!!!',
			progress: 0,
			isShown: false,
			stopWatchIsShown: true,
			countDownIsShown: false,
			currentStopwatchTime: {
				hours: '00',
				minutes: '00',
				seconds: '00',
				centiseconds: '00'
			},
			currentCountdownTime: {
        		hours: '00',
        		minutes: '00',
        		seconds: '00'
     		},
      		timerTime: '',
      		timerTimeCountDown: 0
      	}
	]	
}

const reducer = (state=initialState, action) => {

	switch(action.type){
		case actionTypes.ADD_BUSINESS:
			let oldBusiness = state.business;
			let newBusiness = [...oldBusiness, action.data];
			let newState = {
				business: newBusiness
			} 
			return newState;

		case actionTypes.SWITCH_BUSINESS_TAB:
			let oldBusiness2 = state.business;
			let index = oldBusiness2.findIndex((el)=>el.id==action.id);
			let newBusiness2 = [...oldBusiness2];
			newBusiness2.forEach((item)=>{
				item.isShown = false;
			})
			newBusiness2[index].isShown = true;
			let newState2 = {
				business: newBusiness2
			}
			return newState2;

		case actionTypes.SAVE_CURRENT_STOPWATCH_TIME:
			let oldBusiness3 = state.business;
			let index3 = oldBusiness3.findIndex((el)=>el.id==action.id);
			let newBusiness3 = [...oldBusiness3];
			newBusiness3[index3].currentStopwatchTime = {...action.time};
			newBusiness3[index3].timerTime = action.timerTime;
			let newState3 = {
				business: newBusiness3
			}
			return newState3;

		case actionTypes.CLEAR_CURRENT_STOPWATCH_TIME:
			let oldBusiness4 = state.business;
			console.log(action.id)
			let index4 = oldBusiness4.findIndex((el)=>el.id==action.id);
			let newBusiness4 = [...oldBusiness4];
			console.log(newBusiness4[index4])
			newBusiness4[index4].currentStopwatchTime = {
				hours: '00',
				minutes: '00',
				seconds: '00',
				centiseconds: '00'
			}
			newBusiness4[index4].timerTime = 0;
			let newState4 = {
				business: newBusiness4
			}
			return newState4;

		case actionTypes.SAVE_TIMER_TIME:
			let index5 = state.business.findIndex((el)=>el.id==action.id);
			let newBusiness5 = [...state.business];
			newBusiness5[index5].timerTimeCountDown = action.time;
			newBusiness5[index5].currentCountdownTime = {
				seconds: ("0" + (Math.floor((action.time / 1000) % 60) % 60)).slice(-2),
    			minutes: ("0" + Math.floor((action.time / 60000) % 60)).slice(-2),
    			hours: ("0" + Math.floor((action.time / 3600000) % 60)).slice(-2),
    		}
			let newState5 = {
				business: newBusiness5
			}

			return newState5;

			case actionTypes.CLEAR_CURRENT_COUNTDOWN_TIME:
			let oldBusiness6 = state.business;
			let index6 = oldBusiness6.findIndex((el)=>el.id==action.id);
			let newBusiness6 = [...oldBusiness6];
			newBusiness6[index6].currentCountdownTime = {
				hours: '00',
				minutes: '00',
				seconds: '00'
			}
			newBusiness6[index6].timerTimeCountDown = 0;
			let newState6 = {
				business: newBusiness6
			}
			return newState6;

		case actionTypes.STOPWATCH_OR_COUNTDOWN_IS_SHOWN_HANDLER:

		let newBusiness7 = [...state.business];
		let index7 = newBusiness7.findIndex((el)=>el.id==action.id);
		if(action.countDownOrStopwatch=='stopWatch'){
			newBusiness7[index7].stopWatchIsShown = true;
			newBusiness7[index7].countDownIsShown = false;
		}
		else if(action.countDownOrStopwatch=='countDown'){
			newBusiness7[index7].stopWatchIsShown = false;
			newBusiness7[index7].countDownIsShown = true;
		}
		let newState7 = {
			business: newBusiness7
		}
		return newState7;

		case actionTypes.DELETE_BUSINESS:
			let newBusiness8 = [...state.business];
			let index8 = newBusiness8.findIndex((el)=>el.id==action.id);
			newBusiness8.splice(index8, 1);
			
			let newState8 = {
				business: newBusiness8
			} 
			return newState8;

		default:
		return state; 
	}
}

export default reducer;