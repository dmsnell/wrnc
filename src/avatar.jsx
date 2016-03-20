import React, { PropTypes } from 'react';
import MysteryMan from 'mystery-man';

export const Avatar = React.createClass( {
	getInitialState: () => ( {
		hasLoaded: false
	} ),

	componentWillMount() {
		const { src } = this.props;

		this.fetchAvatar( src, null );
	},

	componentWillReceiveProps( { src } ) {
		this.fetchAvatar( src, this.props.src );
	},

	fetchAvatar( src, prevSrc ) {
		if ( src === prevSrc ) {
			return;
		}

		this.setState( { hasLoaded: false }, () => {
			const avatar = new Image();
			avatar.onload = this.replaceMysteryMan;
			avatar.src = src;
		} );
	},

	replaceMysteryMan() {
		this.setState( { hasLoaded: true } );
	},

	render() {
		const { hasLoaded } = this.state;
		const { src } = this.props;

		return hasLoaded
			? <img className="avatar" { ...{ src } } />
			: <div className="avatar"><MysteryMan /></div>;
	}
} );

Avatar.propTypes = {
	src: PropTypes.string
};

export default Avatar;
