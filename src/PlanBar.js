import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import PlanChip from './PlanChip.js';


class PlanBar extends React.Component {
  getCourseCards(){
    //console.log(this.props);
    let cartCourses = [];
    for(const course of Object.entries(this.props.planableCourses)) {
        console.log(course);
        
        cartCourses.push (
          <PlanChip key={course[0]} name={course[0]} data={course[1]} setPlannedCourses={this.props.setPlannedCourses}/>
        )
      }
      

      return cartCourses;

  }

  showSched() {
    let sched = [];
    for(const opt of Object.entries(this.props.schedOptions)){
      sched.push(
        <div>
          {this.props.schedOptions[this.props.index]}
        </div>
      )
    }
  }

  render() {
    return (
      <>
      <div flexDirection="column">
        <div style={{flex:1}} >
        <Card style={{width: '22em', marginLeft: '5px', height: 'calc( ( 2 * (100vh - 10px))/ 3)', position: '0', overflow:'scroll'}}>
          <Card.Body>
            <Card.Title>Schedule Planner</Card.Title>
            <Card.Subtitle>Select which courses you'd like to add to your schedule</Card.Subtitle>
            <button type="submit" onClick={this.props.trigger}>Find Schedules</button>
            <div style={{margin: '5px'}}>
                {this.getCourseCards()}
            </div>
          </Card.Body>
        </Card>
        </div>
        <div style={{flex:1}} >
        <Card style={{width: '22em', marginLeft: '5px', height: 'calc((100vh - 10px) / 3)', position: '1', overflow:'scroll'}}>
          <Card.Body>
            <Card.Title>Navigate Schedules</Card.Title>
            <Card.Subtitle>Use the arrow to navigate through possible menu</Card.Subtitle>
            <button type="submit" onClick={null}>Next</button>
            <button type="submit" onClick={null}>Prev</button>
            <div style={{margin: '5px'}}>
                {this.showSched()}
            </div>
          </Card.Body>
        </Card>
        </div>
        </div>
      </>
    )
  }
}

export default PlanBar;
