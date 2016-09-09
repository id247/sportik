import Cookie from 'js-cookie';
import { PromoOptions } from 'appSettings';

import * as loadingActions 		from '../actions/loading';
import * as errorActions 		from '../actions/error';
import * as userActions 		from '../actions/user';
import * as pageActions 		from '../actions/page';
import * as cookiesActions 		from '../actions/cookies';




//cookies
export function getCookies() {
	return dispatch => {
		const cookies = Cookie.get(PromoOptions.cookieName);

		if (!cookies){
			return;
		}

		try{
			const data = JSON.parse(cookies);
		}catch(e){
			console.error(e);
			return;
		}
		

		dispatch(cookiesAction.cookiesSet(data));
	}
}
export function setCookies() {
	return (dispatch, getState) => {
		const data = JSON.stringify(getState().cookies);

		//new Date(new Date().getTime() + .5 * 60 * 1000)

		Cookie.set(PromoOptions.cookieName, data, { 
			domain: PromoOptions.cookieDomain, 
			path: '/'
		});		
	}
}


//init

export function init() {
	return dispatch => {
		return dispatch(getCookies());	
	}
}

