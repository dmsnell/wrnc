import React from 'react';
import {
	ap,
	apply,
	complement,
	compose,
	concat,
	defaultTo,
	find,
	flip,
	groupBy,
	identity,
	length,
	of,
	partition,
	prop,
	propEq
} from 'ramda';

const applicator = compose( flip( apply ), of ); // a -> (a -> b) -> b
const pipe2 = flip( compose ); // (a -> b) -> (b -> c) -> (a -> c)
const childProp = compose( pipe2( prop( 'props' ) ), prop ); // item -> string | undefined
const findIn = flip( find ); // [a] -> (a -> bool) -> a | undefined
const groupFilter = childProp( 'filter' ); // group -> ( item -> bool ) | undefined
const groupName = prop( 'key' ); // group -> string | undefined
const withDefaultGroup = defaultTo( { key: 'noGroupFound' } ); // (group | undefined) -> group
const isTimeGroup = compose( propEq( 'displayName', 'GroupHeader' ), prop( 'type' ) ); // group -> bool
const filterApplicator = compose( pipe2( groupFilter ), applicator ); // item -> (group -> bool)
const propOf = flip( prop ); // a -> string -> b

export const GroupedList = React.createClass( {
	getInitialState() {
		return { items: [] }
	},

	componentWillMount() {
		this.updateItems( this.props.children );
	},

	componentWillReceiveProps( { children } ) {
		this.updateItems( children );
	},

	updateItems( allChildren ) {
		const [
			timeGroups,
			children
		] = partition( isTimeGroup, React.Children.toArray( allChildren ) );

		const groupMatcher = compose( findIn( timeGroups ), filterApplicator );
		const matchingGroupName = compose( groupName, withDefaultGroup, groupMatcher );

		const groups = groupBy( matchingGroupName, children );
		const groupItems = compose( defaultTo( [] ), propOf( groups ), groupName );
		const groupHasItems = compose( Boolean, length, groupItems );

		const flattenGroup = compose( ap( [ identity, groupItems ] ), of );

		const items = timeGroups
			.filter( groupHasItems )
			.map( flattenGroup )
			.reduce( concat, [] );

		this.setState( { items } );
	},

	render() {
		const { items } = this.state;

		return (
			<div>
				{ items }
			</div>
		);
	}
} );

export const GroupHeader = React.createClass( {
	render() {
		const { children } = this.props;

		return <div className="list-group">{ children }</div>;
	}
} );

export default GroupedList;
