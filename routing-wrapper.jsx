import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { compose, applyMiddleware } from 'redux';
import { identity } from 'lodash';

import {
	NOTE_SELECT
} from 'src/constants';

const ROUTE_SELECT = 'routing-middleware-route-select';

const routingMiddleware = selectNote => store => next => action => {
	const { id, type, fromRoutingMiddleware } = action;

	switch ( type ) {
		case NOTE_SELECT:
			if ( fromRoutingMiddleware ) {
				return next( action );
			}

			selectNote( id );
			return next( action );

		case ROUTE_SELECT:
			return next( {
				...action,
				fromRoutingMiddleware: true,
				type: NOTE_SELECT
			} );

		default:
			return next( action );
	}

	selectNote( id );
};

const Wrapper = ( Factory, enhancers = identity ) => props => {
	let App, store;

	return React.createClass( {
		componentWillMount() {
			const localApp = Factory( compose(
				enhancers,
				applyMiddleware( routingMiddleware( this.selectNote ) )
			) );

			App = localApp.App;
			store = localApp.store;

			const { selectedNote } = this.props.params;

			this.dispatchAction( selectedNote );
		},

		componentWillReceiveProps( { params: { selectedNote } } ) {
			this.dispatchAction( selectedNote );
		},

		dispatchAction( selectedNote ) {
			const id = selectedNote
				? parseInt( selectedNote, 10 )
				: null;

			store.dispatch( {
				type: ROUTE_SELECT,
				id
			} );
		},

		selectNote( id ) {
			if ( id ) {
				return browserHistory.push( `/${ id }` );
			}

			if ( null === id ) {
				return browserHistory.goBack();
			}
		},

		render() {
			return <App { ...props } />;
		}
	} );
};

const RoutingComponent = ( Factory, enhancers ) => props => (
	<Router history={ browserHistory }>
		<Route path="/(:selectedNote)" component={ Wrapper( Factory, enhancers )( props ) } />
	</Router>
);

export default RoutingComponent;
