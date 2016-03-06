import React from 'react';
import classNames from 'classnames';
import {
	compose,
	constant,
	getOr,
	matchesProperty,
	partial,
	pick,
	property
} from 'lodash/fp';

require( 'filter-bar.scss' );

const filterExtractor = compose( pick( [ 'name', 'filter' ] ), property( 'props' ) );

const FilterBar = state => React.createClass( {
	componentWillMount() {
		this.updateFilterList();
	},

	componentWillUpdate() {
		this.updateFilterList();
	},

	updateFilterList() {
		const { children } = this.props;

		state.filters = React.Children.map( children, filterExtractor );
	},

	render() {
		const {
			selectedFilter,
			updateFilter
		} = this.props;
		const { filters } = state;

		return (
			<ul className="filter-bar">
				{ filters.map( ( { name }, key ) => (
					<li
						className={ classNames( { isSelected: selectedFilter === name } ) }
						onClick={ partial( updateFilter, [ name ] ) }
						{ ...{ key } }
					>
						{ name }
					</li>
				) ) }
			</ul>
		);
	}
} );

const FilterBarFactory = () => {
	const state = {
		filters: []
	};

	const getFilter = name => getOr(
		constant( true ),
		'filter',
		state.filters.find( matchesProperty( 'name', name ) )
	);

	return {
		FilterBar: FilterBar( state ),
		getFilter
	};
};

export default FilterBarFactory;
