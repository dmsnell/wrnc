import React from 'react';

require( './site-block.scss' );

export const SiteBlock = ( { children, siteId } ) =>
	<span className="text-range site">{ children }</span>;

export default SiteBlock;
