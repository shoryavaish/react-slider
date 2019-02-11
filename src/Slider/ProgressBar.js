import React from 'react';
import './loader.css';

let loaderInterval;

class ProgressBar extends React.Component {
	constructor(props) {
	    super(props)
	    this.state = {
	    	percentage: 0,
            scrollTime: props.scrollTime
	    }
    	this.nextStep = this.nextStep.bind(this)
  	}
  	componentDidMount(){
  		loaderInterval = setInterval(this.nextStep, (this.state.scrollTime/10));
  	}
  	async nextStep() {
    	if(this.state.percentage >= 100) return this.setState({ percentage: 0 })
    	this.setState((prevState) => ({ percentage: prevState.percentage + 10 }));
  	}
 	render() {
        const {width} = this.props;
    	return (
    		<div className="progress-bar" style={{width}}>
        		<Filler percentage={this.state.percentage} />
     		</div>
    	)
  	} 
  	componentWillUnmount(){
        clearInterval(loaderInterval);
  	} 
}

const Filler = (props) => {
  	return <div className="filler" style={{ width: `${props.percentage}%` }} />
}
export default ProgressBar;