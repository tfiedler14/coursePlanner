import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Section from './Section';
import Popup from "reactjs-popup";




class Course extends React.Component {
  
  render() {
    return (
      <Card style={{width: '33%', marginTop: '5px', marginBottom: '5px'}}>
        <Card.Body>
          <Card.Title>{this.props.data.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.data.number} - {this.getCredits()}</Card.Subtitle>
          <button id={this.props.data.sections} onClick={() => this.props.setCartCourses(this.props.data.name, this.props.data.sections, 1)}  style={{backgroundColor: "#800000", color:"#fff"}}>Add to cart</button>
          <Popup trigger={<button style={{backgroundColor: "#800000", color: "#fff"}} >Sections</button>} position="right top">{this.popUpSections()}</Popup>
        </Card.Body>
      </Card>
    )
  }

  getCredits() {
    if(this.props.data.credits === 1)
      return '1 credit';
    else
      return this.props.data.credits + ' credits';
  }

  getSections() {
    let a = this.props.data.sections;
    console.log(a);
    return a;
  }
  
  popUpSections(){
    let sections = [];
    
    for(const section of Object.entries(this.props.data.sections)){
        sections.push(
          <Section key={section[0]} name ={section[0]} data={section[1]} number={this.props.data.number} parent={this.props.data.name} setCartCourses={this.props.setCartCourses} section={section}/>
        );
    }

    return sections;
  }
}
export default Course;


