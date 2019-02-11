import React from 'react';
import './style.css';

const Slide = ({image, index, currentIndex}) => {
	const styles = {
	    backgroundImage: `url(${image})`,
	    backgroundSize: 'cover',
	    backgroundRepeat: 'no-repeat',
	    backgroundPosition: 'center'
	};
	return(
		<div className="slide" style={styles}></div>
	)
}
export default Slide;