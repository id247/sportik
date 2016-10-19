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

console.log(parentDoc.location);

console.log(25);


function setPadding(){
	if (parentWin.outerWidth <= 1450){
		paddingTop.style.height = '180px';
	}else{
		paddingTop.style.height = '';
	}
}
setPadding();

document.addEventListener('DOMContentLoaded', () => {

	if (frameElement && app){

		frameElement.style.position = 'absolute';
		frameElement.style.top = '0';
		frameElement.style.left = '0';
		frameElement.style.right = '0';
		frameElement.style.width = '100%';
		frameElement.style.height = '800px';
		frameElement.style.border = 'none';

		parentDoc.body.insertBefore(frameElement, parentDoc.body.firstChild);
		parentDoc.body.insertBefore(paddingTop, frameElement);
	}

	ReactDOM.render(
		<Root store={store} />,
		app
	);

});   


parentWin && parentWin.addEventListener('resize', () => {
	setPadding();
});






