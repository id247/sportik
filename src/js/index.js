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
const styles = document.getElementById('sportik-styles');
const mainLink = document.getElementById('main_link').getAttribute('href');

console.log(parentDoc.location);

document.addEventListener('DOMContentLoaded', () => {

	console.log('DOMContentLoaded');

	if (frameElement){

		app.style.position = 'absolute';
		app.style.top = '0';
		app.style.left = '0';
		app.style.right = '0';
		app.style.width = '100%';
		app.style.height = '1300px';
		app.style.border = 'none';

		frameElement.style.position = 'absolute';
		frameElement.style.left = '-9999px';


		//parentDoc.body.insertBefore(frameElement, parentDoc.body.firstChild);
		//parentDoc.body.insertBefore(paddingTop, frameElement);
		parentDoc.head.appendChild(styles);
		parentDoc.body.insertBefore(paddingTop, parentDoc.body.firstChild);
		parentDoc.body.insertBefore(app, parentDoc.body.firstChild);
		//parentDoc.body.insertBefore(frameElement.parent, parentDoc.body.firstChild);

	}

	if (app){

		ReactDOM.render(
			<Root store={store} mainLink={mainLink} paddingTop={paddingTop}/>,
			app
		);

	}

});
