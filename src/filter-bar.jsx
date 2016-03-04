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

let filters = [];
const filterExtractor = compose( pick( [ 'name', 'filter' ] ), property( 'props' ) );

export const getFilter = name => getOr( constant( true ), 'filter', filters.find( matchesProperty( 'name', name ) ) );

const FilterBar = React.createClass( {
	componentWillMount() {
		this.updateFilterList();
	},
	
	componentWillUpdate() {
		this.updateFilterList();
	},
	
	updateFilterList() {
		const { children } = this.props;

		filters = React.Children.map( children, filterExtractor );
	},

	render() {
		const {
			selectedFilter,
			updateFilter
		} = this.props;

		return (
			<ul>
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

export default FilterBar;
