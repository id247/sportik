'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/configureStore';
import Root from './components/Root';

const store = configureStore(); 

const parentWin = window.parent ? window.parent : window;
const parentDoc = parentWin.document;

const app = document.getElementById('app');
const styles = document.getElementById('sportik-styles');

document.addEventListener('DOMContentLoaded', () => {

	if (app){
		parentDoc.body.appendChild(app);
	}
	if (styles){
		parentDoc.head.appendChild(styles);
	}

	ReactDOM.render(
		<Root store={store} />,
		app
	);

});   








