import React from 'react';

require( './user-block.scss' );

export const UserBlock = ( { children, id } ) =>
	<span className="text-range user">{ children }</span>;

export default UserBlock;
