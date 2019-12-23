import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';






class PlanChip extends React.Component {
  
  handleClick = () =>{
  this.props.setPlannedCourses(this.props.name, this.props.data, 1);
  }


  render() {
    return (
      <Card style={{width: '18em', marginTop: '5px', marginBottom: '5px'}}>
        <Card.Body>
          <div layout="row" layout-align="start center">
                <input style={{flex: '15'}} type="checkbox" onClick={this.handleClick}/>
                <label style={{flex: '85', marginLeft: '5px', color: "#800000", fontWeight:"bold"}} >{this.props.name}</label>
          </div>
 
        </Card.Body>
      </Card>
    )
  }

}


export default PlanChip;
