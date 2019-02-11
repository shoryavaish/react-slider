import React, { Component } from 'react';
import Slider from '../Slider';
import {setSliderData} from '../redux/actions/slider'; 
import { connect } from 'react-redux';
import './style.css';

class ProjectShowcase extends Component {
	constructor(props){
		super(props);
		this.state = {}
	}
	componentDidMount(){
		fetch("https://api.unsplash.com/search/photos?page=1&query=office", {
			method: "GET",
			headers: {
	            "Authorization": "Client-ID fe258fd400101574b66866c547e3cd8f194329e90ab5b6dee089b8ec014911ea"
        	},
		}).then(res => res.json())
		.then(data=> this.props.setSliderData(data))
		.catch(error => console.error(error))
	}
    render() {
    	let images = [], titles = [];
    	this.props.sliderData.results && 
    	this.props.sliderData.results.map(result=> {
    		images.push(result.urls.small);
    		titles.push(result.description);
    		return false;
    	});
        return (
        	<div className="sliders-layout">
            	<Slider images={images} titles={titles} scrollTime={3000} width={350} height={200}/>
            	<Slider images={images} titles={titles} scrollTime={3000} width={350} height={200}/>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
 	sliderData: state.sliderData
});
const mapDispatchToProps = (dispatch, ownProps) => ({
	setSliderData: (data) => dispatch(setSliderData(data))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectShowcase);