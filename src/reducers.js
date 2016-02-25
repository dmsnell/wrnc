import { combineReducers } from 'redux';
import {
	UPDATE_MESSAGE
} from 'constants';

const message = ( state = 'Building…', action ) => {
	if ( UPDATE_MESSAGE !== action.type ) {
		return state;
	}
	
	return action.message;
};

export default combineReducers( {
	message
} );
