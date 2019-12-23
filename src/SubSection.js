import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';




class SubSection extends React.Component {
  
  render() {
    return (
      
      <Card >
        <Card.Body>
            <Card.Title>{this.props.parent}</Card.Title>
          <Card.Subtitle>{this._reactInternalFiber.key}</Card.Subtitle>
          <button id={this.props.data.sections} onClick={() => this.props.setCartCourses(this.props.grandParent + ": " + this.props.parent + ": " + this._reactInternalFiber.key, this.props.sub, 1)}  style={{backgroundColor: "#800000", color:"#fff"}}>Add to cart</button>
        </Card.Body>
      </Card>
    )
  }
}
export default SubSection;


