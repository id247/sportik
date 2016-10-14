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

export const COOKIES_APPEARANCE_COUNT_UPDATE = 'COOKIES_APPEARANCE_COUNT_UPDATE';

export function cookiesAppearanceCountUpdate() {
	return {
		type: COOKIES_APPEARANCE_COUNT_UPDATE,
	}
};

export function cookiesRead(){
	return dispatch => {
		const { props } = this;
		const cookie = Cookie.get(PromoOptions.cookieName);

		console.log(cookie);

		if (!cookie){
			dispatch(cookiesSet({}));
			return false;
		}

		try	{

			const cokieObj = JSON.parse(cookie)
			
			//if last appearanse was yesterday - reset appearance counter to show pers again
			const today = new Date().getMonth() * 100 + new Date().getDate();

			if (today > cookie.appearanceDate){
				console.log('yesterday');
				cokieObj.appearanceCount = 0;
			}

			cokieObj.appearanceCount = 0;

			dispatch(cookiesSet(cokieObj));

		}catch(e){
			console.log(e);
			dispatch(cookiesSet({}));
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

		const timestamp = new Date(new Date().getTime() + 5 * 60 * 1000).getTime();

		console.log(timestamp);

		dispatch(cookiesSetHiddenUntil(timestamp));
		dispatch(cookiesWrite());

	}
}


export function cookiesShowPers(){
	return (dispatch, getState) => {

		dispatch(cookiesSetHiddenUntil(0));
		dispatch(cookiesWrite());

	}
}

export function appearanceCountUpdate(){
	return (dispatch, getState) => {

		dispatch(cookiesAppearanceCountUpdate());
		dispatch(cookiesWrite());

	}
}

