import React from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { compose, applyMiddleware } from 'redux';
import { identity } from 'lodash';

import {
	FILTER_SET,
	NOTE_SELECT
} from 'src/constants';

const ROUTE_FILTER_SET = 'routing-middleware-filter-select';
const ROUTE_NOTE_SELECT = 'routing-middleware-note-select';

const routingMiddleware = ( { selectNote, setFilter } ) => store => next => action => {
	const { id, type, name, fromRoutingMiddleware } = action;

	if ( fromRoutingMiddleware ) {
		return next( action );
	}

	switch ( type ) {
		case FILTER_SET:
			setFilter( name );
			return next( action );

		case ROUTE_FILTER_SET:
			return next( {
				...action,
				fromRoutingMiddleware: true,
				type: FILTER_SET
			} );

		case NOTE_SELECT:
			selectNote( id );
			return next( action );

		case ROUTE_NOTE_SELECT:
			return next( {
				...action,
				fromRoutingMiddleware: true,
				type: NOTE_SELECT
			} );

		default:
			return next( action );
	}
};

const Wrapper = ( Factory, enhancers = identity ) => props => {
	let App, store;

	return React.createClass( {
		componentWillMount() {
			const localApp = Factory( compose(
				enhancers,
				applyMiddleware( routingMiddleware( {
					selectNote: this.selectNote,
					setFilter: this.setFilter
				} ) )
			) );

			App = localApp.App;
			store = localApp.store;

			// If we load on a specific note, provide a
			// "back" item in history to get back to the
			// main list.
			if ( this.props.params.selectedNote ) {
				const path = this.buildPath( this.props.params );

				browserHistory.push( this.buildPath( {
					...this.props.params,
					selectedNote: null
				} ) );
				browserHistory.push( path );
			}

			this.dispatchAction( this.props.params );
		},

		componentWillReceiveProps( nextProps ) {
			this.dispatchAction( nextProps.params );
		},

		buildPath( params ) {
			let { selectedFilter, selectedNote } = params;
			const state = store.getState();

			if ( ! selectedFilter ) {
				selectedFilter = state.selectedFilter;
			}

			if ( ! selectedNote ) {
				selectedNote = state.selectedNote;
			}

			return '' +
				( selectedFilter ? '/filter/' + selectedFilter : '' ) +
				( selectedNote ? '/note/' + selectedNote : '' );
		},

		dispatchAction( { selectedFilter: name = null, selectedNote } ) {
			const id = selectedNote
				? parseInt( selectedNote, 10 )
				: null;

			store.dispatch( {
				type: ROUTE_FILTER_SET,
				name
			} );

			store.dispatch( {
				type: ROUTE_NOTE_SELECT,
				id
			} );
		},

		selectNote( id ) {
			if ( id ) {
				return browserHistory.push( this.buildPath( { selectedNote: id } ) );
			}

			if ( null === id ) {
				return browserHistory.goBack();
			}
		},

		setFilter( name ) {
			browserHistory.push( this.buildPath( { selectedFilter: name } ) );
		},

		render() {
			return <App { ...props } />;
		}
	} );
};

const RoutingComponent = ( Factory, enhancers ) => props => {
	const App = Wrapper( Factory, enhancers )( props );

	return (
		<Router history={ browserHistory }>
			<Route path="/" component={ App }>
				<IndexRoute component={ App } />
				<Route path="/filter/:selectedFilter/note/:selectedNote" component={ App } />
				<Route path="/filter/:selectedFilter" component={ App } />
				<Route path="/note/:selectedNote" component={ App } />
			</Route>
		</Router>
	);
};

export default RoutingComponent;
