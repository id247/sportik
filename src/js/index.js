'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/configureStore';
import Root from './components/Root';

const store = configureStore(); 

const parentWin = window.parent ? window.parent : window;
const parentDoc = parentWin.document;
const paddingTop = document.createElement('div');

const app = document.getElementById('app');
const mainLink = document.getElementById('main_link').getAttribute('href');

console.log(parentDoc.location);

document.addEventListener('DOMContentLoaded', () => {

	if (frameElement){

		frameElement.style.position = 'absolute';
		frameElement.style.top = '0';
		frameElement.style.left = '0';
		frameElement.style.right = '0';
		frameElement.style.width = '100%';
		frameElement.style.height = '1300px';
		frameElement.style.border = 'none';

		parentDoc.body.insertBefore(frameElement, parentDoc.body.firstChild);
		parentDoc.body.insertBefore(paddingTop, frameElement);

	}

	if (app){

		ReactDOM.render(
			<Root store={store} mainLink={mainLink} paddingTop={paddingTop}/>,
			app
		);

	}

});
