import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Popup from "reactjs-popup";
import SubSection from './SubSection';



class Section extends React.Component {
  
  render() {
    return (
      
      <Card>
        <Card.Body>
          <Card.Title>{this.props.number}</Card.Title>
          <Card.Subtitle>{this._reactInternalFiber.key}</Card.Subtitle>
          <Card.Text className="mb-2 text-muted">{this.getSubSectionCount() + " subsection(s)"}</Card.Text>
          <button id={this.props.data.sections} onClick={() => this.props.setCartCourses(this.props.parent + ": " + this.props.name, this.props.section, 1)}  style={{backgroundColor: "#800000", color:"#fff"}}>Add to cart</button>
          
          <Popup trigger={<button style={{backgroundColor: "#800000", color: "#fff"}} disabled={this.buttonDisabler(this.getSubSectionCount())}>Subsections</button>} position="right top">{this.popUpSubSections()}</Popup>


        </Card.Body>
      </Card>
    )
  }

  getSubSectionCount(){
    console.log(this);
    let index = 0;
    for(const subSection of Object.values(this.props.data.subsections)){
      index = index + 1;
    }
    return index;
  }
  buttonDisabler(count){
    if(count > 0){
      return false;
    }
    return true;
  }

  popUpSubSections(){
 
      let sections = [];
     // console.log(this.props.data.time);
      for(const subsec of Object.entries(this.props.data.subsections)){
          sections.push(
            <SubSection key={subsec[0]} data={subsec[1]} grandParent={this.props.parent} parent={this._reactInternalFiber.key} setCartCourses={this.props.setCartCourses} timeblock={this.props.data.time} sub={subsec}/>
          );
      }
  
      return sections;
  }
}
export default Section;


