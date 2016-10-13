import { combineReducers } from 'redux';

import * as actions from '../actions/cookies';


export function chosenPers(state = false, action) {
	switch (action.type) {
		case actions.COOKIES_SET:
			return 	action.payload.chosenPers ? action.payload.chosenPers : state;
		case actions.COOKIES_UNSET:
			return 	false;
		default:
			return state;
	}
}

export function hiddenUntil(state = 0, action) {
	switch (action.type) {
		case actions.COOKIES_SET:
			return 	action.payload.hiddenUntil ? action.payload.hiddenUntil : state;
		case actions.COOKIES_UNSET:
			return 	false;

		case actions.COOKIES_SET_HIDDEN_UNTIL:
			return 	action.payload;
		default:
			return state;
	}
}

export function appearanceCount(state = 0, action) {
	switch (action.type) {
		case actions.COOKIES_SET:
			return 	action.payload.appearanceCount ? action.payload.appearanceCount : state;
		case actions.COOKIES_UNSET:
			return 	false;

		case actions.COOKIES_APPEARANCE_COUNT_UPDATE:
			return 	state + 1;
		default:
			return state;
	}
}

export function appearanceDate(state = false, action) {
	switch (action.type) {
		case actions.COOKIES_SET:
			return 	new Date().getMonth() * 100 + new Date().getDate();
		case actions.COOKIES_UNSET:
			return 	false;

		default:
			return state;
	}
}


export const cookies = combineReducers({
	chosenPers,
	hiddenUntil,
	appearanceCount,
	appearanceDate,
});
