import React, { Component } from 'react';
import { render } from 'react-dom';
import DayPlan from './DayPlan';
//import './style.css';

class DayArea extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       blocks: [this.props.blocks]
//     };
//   }

  render() {
    return (
      <DayPlan title={this.props.day} 
           blocks={this.props.blocks} 
           start={7} 
           end={19} 
           height={600}
           width='12.5vw'/>
    );
  }
}
export default DayArea;
