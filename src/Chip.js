import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';


class Chip extends React.Component {
  
  render() {
    
      
    return (
    <div style={{borderRadius: 2, borderColor: "#800000", padding:4, margin: 2, display:'flex', flexDirection:'row'}}>
        <span>{this.props.data}</span>
        <Button variant='secondary' style={{fontSize:10, padding: 4, width: 18, height: 18, marginLeft:5}} onClick={() => this.props.setChips} >X</Button>
    </div>

    )
  }



getName(){
    console.log(this.props);
    return "ho";
}
}

export default Chip;
