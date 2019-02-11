import React, { Component } from 'react';
import Slide from './Slide';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import './style.css';

let sliderTimer;

class Slider extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		images: props.images,
		    titles: props.titles,
			currentIndex: 0,
			translateValue: 0,
			scrollTime: props.scrollTime,
			width: props.width || window.innerWidth-11,
			height: props.height || window.height
    	}
  	}
  	static getDerivedStateFromProps(props, state){
  		if(props.images !== state.images){
  			return {
  				images: props.images,
  				currentIndex: 0
  			};
  		}
  		if(props.titles !== state.titles){
  			return {titles: props.titles};
  		}
  		return null;
  	}
	componentDidMount(){
		this.autoPlaySlider();
	}
	autoPlaySlider(){
		const { scrollTime, width } = this.state;
		sliderTimer = setInterval(()=> {
			this.setState(prevState => ({
				currentIndex: prevState.currentIndex+1,
				translateValue: prevState.translateValue - width+75
			}));
		}, scrollTime);
	}
	componentDidUpdate(prevProps, prevState){
		if(this.state.currentIndex === this.state.images.length-1){
			setTimeout(()=> {
				this.setState({
					currentIndex: 0,
					translateValue: 0
				});
			}, this.state.scrollTime)
		}
	}
    render() {
    	const {images, currentIndex, translateValue, titles, scrollTime, width, height} = this.state;
    	if(!images) return null;
        return (
            <div className="slider" style={{width: `${width-75}px`}}>
            	<div className="slider-wrapper"
          			style={{
				        transform: `translateX(${translateValue}px)`,
				        width: `${width*(images.length-1)}px`,
				        height
					}}
				>
					{images.map((image, index) => 
						<div key={index} className="slide-container" style={{width: `${width-75}px`}}>
			            	<Slide image={image} currentIndex={currentIndex} index={index} />
			            	<div className="slide-loader-wrapper">
								<ProgressBar scrollTime={scrollTime} width={width-75}/>
								<div className="title-dots-wrapper" style={{width: `${width-75}px`}}>
									<div className="title">{titles[currentIndex]}</div>
									<div className="dots-wrapper">
										{images.map((image, i) => 
											<div className={`${currentIndex === i? 'filled-dot' : 'dot'}`} key={i}></div>
										)}
									</div>
								</div>
							</div>
						</div>
					)}
		        </div>
            </div>
        );
    }
    componentWillUnmount(){
    	clearInterval(sliderTimer)
    }
}
Slider.propTypes = {
	images: PropTypes.array.isRequired,
	scrollTime: PropTypes.number.isRequired,
	titles: PropTypes.array,
	width: PropTypes.number,
	height: PropTypes.number,

};
export default Slider;