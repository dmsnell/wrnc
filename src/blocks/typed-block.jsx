import React from 'react';

require( './typed-block.scss' );

export const TypedBlock = ( { children, type } ) =>
	<span className={ `text-range typed type-${ type }` }>{ children }</span>;

export default TypedBlock;
