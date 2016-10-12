import { combineReducers } from 'redux';

import * as actions from '../actions/cookies';


export function chosenPers(state = false, action) {
	switch (action.type) {
		case actions.COOKIES_SET:
			return 	action.payload.chosenPers;
		case actions.COOKIES_UNSET:
			return 	false;
		default:
			return state;
	}
}

export function hiddenUntil(state = 0, action) {
	switch (action.type) {
		case actions.COOKIES_SET:
			return 	action.payload.hiddenUntil;
		case actions.COOKIES_UNSET:
			return 	false;

		case actions.COOKIES_SET_HIDDEN_UNTIL:
			return 	action.payload;
		default:
			return state;
	}
}


export const cookies = combineReducers({
	chosenPers,
	hiddenUntil,
});
