import React from 'react';
import ReactDOM from 'react-dom';

import App from 'src/app';

import {
	oAuthToken
} from './config.js';

ReactDOM.render(
	<App { ...{
		oAuthToken
	} } />,
	document.getElementById( 'root' )
);
