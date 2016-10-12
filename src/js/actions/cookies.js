import Cookie from 'js-cookie';
import { PromoOptions } from 'appSettings';

export const COOKIES_SET = 'COOKIES_SET';
export const COOKIES_UNSET = 'COOKIES_UNSET';

export function cookiesSet(data) {
	return {
		type: COOKIES_SET,
		payload: data
	}
};

export function cookiesUnset() {
	return {
		type: COOKIES_UNSET
	}
};

export const COOKIES_SET_HIDDEN_UNTIL = 'COOKIES_SET_HIDDEN_UNTIL';

export function cookiesSetHiddenUntil(timestamp) {
	return {
		type: COOKIES_SET_HIDDEN_UNTIL,
		payload: timestamp,
	}
};

export function cookiesRead(){
	return dispatch => {
		const { props } = this;
		const cookie = Cookie.get(PromoOptions.cookieName);

		console.log(cookie);

		if (!cookie){
			return false;
		}
		
		try	{
			dispatch(cookiesSet(JSON.parse(cookie)));
		}catch(e){
			console.log(e);
		}	
	}
}
export function cookiesWrite(){
	return (dispatch, getState) => {
		const cookies = getState().cookies;

		console.log(JSON.stringify(cookies));

		Cookie.set(PromoOptions.cookieName, JSON.stringify(cookies), { 
			domain: PromoOptions.cookieDomain, 
			path: '/'
		});
	}
}

export function cookiesHidePers(){
	return (dispatch, getState) => {

		const timestamp = new Date(new Date().getTime() + .5 * 60 * 1000).getTime();

		console.log(timestamp);

		dispatch(cookiesSetHiddenUntil(timestamp));
		dispatch(cookiesWrite());

	}
}

