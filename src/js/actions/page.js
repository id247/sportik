export const PAGE_SET = 'PAGE_SET';

export function setPage(page) {

	return {
		type: PAGE_SET,
		payload: page,
	}
}


