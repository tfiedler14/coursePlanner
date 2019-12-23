import React from 'react';
import './App.css';
import Course from './Course';


class CourseArea extends React.Component {
  getCourses() {
    let courses = [];
    console.log(this.props);

    for(const course of Object.entries(this.props.data)) {
      courses.push (
        <Course key={course[0]} code={course[0]} data={course[1]} setCartCourses={this.props.setCartCourses}/>
      )
    }

    return courses;
  }

  render() {
    return (
      <div style={{margin: '5px'}}>
        {this.getCourses()}
       
      </div>
    )
  }
}

export default CourseArea;
