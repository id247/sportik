import { combineReducers } from 'redux';

import { error } from './error';
import { user } from './user';
import { loading } from './loading';
import { page } from './page';
import { cookies } from './cookies';

const rootReducer = combineReducers({
	error,
	loading,
	user,
	page,
	cookies,
});

export default rootReducer;
