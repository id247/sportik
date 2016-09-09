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

