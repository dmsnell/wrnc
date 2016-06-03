import React from 'react';
import classNames from 'classnames';
import always from 'ramda/src/always';
import compose from 'ramda/src/compose';
import partial from 'ramda/src/partial';
import pick from 'ramda/src/pick';
import prop from 'ramda/src/prop';
import propEq from 'ramda/src/propEq';
import propOr from 'ramda/src/propOr';

require( 'filter-bar.scss' );

const onlyFilters = compose( propEq( 'name', 'Filter' ), prop( 'type' ) );
const filterExtractor = compose( pick( [ 'name', 'filter' ] ), prop( 'props' ) );

export const Filter = ( { isSelected, name, onClick } ) =>
	<li className={ classNames( { isSelected } ) } { ...{ onClick } }>{ name }</li>;

export const FilterBar = state => React.createClass( {
	componentWillMount() {
		this.updateFilterList();
	},

	componentWillUpdate() {
		this.updateFilterList();
	},

	updateFilterList() {
		const { children } = this.props;

		state.filters = React.Children.toArray( children )
			.filter( onlyFilters )
			.map( filterExtractor );
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
					<Filter
						isSelected={ selectedFilter === name }
						onClick={ partial( updateFilter, [ name ] ) }
						{ ...{ key, name } }
					/>
				) ) }
			</ul>
		);
	}
} );

const FilterBarFactory = () => {
	const state = {
		filters: []
	};

	const getFilter = name => propOr(
		always( true ),
		'filter',
		state.filters.find( propEq( 'name', name ) )
	);

	return {
		FilterBar: FilterBar( state ),
		getFilter
	};
};

export default FilterBarFactory;
