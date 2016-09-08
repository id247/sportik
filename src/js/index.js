'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/configureStore';
import Root from './components/Root';

const store = configureStore(); 

const parentWin = window.parent ? window.parent : window;
const parentDoc = parentWin.document;

const app = document.getElementById('app');

document.addEventListener('DOMContentLoaded', () => {

	parentDoc.body.appendChild(app);

	ReactDOM.render(
		<Root store={store} />,
		app
	);

});   








