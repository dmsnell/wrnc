import React from 'react';
import compose from 'ramda/src/compose';
import concat from 'ramda/src/concat';
import partition from 'ramda/src/partition';
import prop from 'ramda/src/prop';
import propEq from 'ramda/src/propEq';

const groupFilter = compose( prop( 'filter' ), prop( 'props' ) );
const hasMatches = a => a.length > 1;
const isGroupHeader = compose( propEq( 'displayName', 'GroupHeader' ), prop( 'type' ) );
const toFilteredGroups = ( [ groupList, remainingChildren ], nextGroup ) => {
	const [ matched, notMatched ] = partition( groupFilter( nextGroup ), remainingChildren );

	return [ [ ...groupList, [ nextGroup, ...matched ] ], notMatched ];
};

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
			groupHeaders,
			children
		] = partition( isGroupHeader, React.Children.toArray( allChildren ) );

		const items = groupHeaders
			.reduce( toFilteredGroups, [ [], children ] )
			.shift()
			.filter( hasMatches )
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

GroupHeader.displayName = 'GroupHeader';

export default GroupedList;
