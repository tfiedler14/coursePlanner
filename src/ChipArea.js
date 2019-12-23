import React from 'react';
import './App.css';
import Chip from './Chip';
import Card from 'react-bootstrap/Card';


class ChipArea extends React.Component {
  getChips() {
    let chips = [];

    // for(const chip of Object.values(this.props.data)) {
    //     chips.push (
    //     <Chip key={chip} data={chip} setChips={this.props.setChips}/>
    //   )
    // }
    console.log(this.props);
    return chips;
  }

  render() {
    return (
      <Card style={{display: 'flex', flexWrap: 'wrap', alignItems:'flex-start', padding: '4'}}>
        {this.getChips()}
       
      </Card>
    )
  }
}

export default ChipArea;
