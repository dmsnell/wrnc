import React from 'react';

require( './post-block.scss' );

export const PostBlock = ( { children, postId, siteId } ) =>
	<span className="text-range post">{ children }</span>;

export default PostBlock;
