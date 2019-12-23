import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';


class Cart extends React.Component {
  handleClick = () => {
    this.props.setCartCourses(this._reactInternalFiber.key , null , 0);
    window.location.reload();
  }
  render() {
      console.log(this.props);
      
    return (
      <Card style={{width: '18em', marginTop: '5px', marginBottom: '5px'}}>
        <Card.Body>
          <Card.Title>{this._reactInternalFiber.key}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text></Card.Text>
          <button type="submit" onClick={this.handleClick} style={{backgroundColor: "#800000", color:"#fff"}}>Remove from cart</button>

        </Card.Body>
      </Card>
    )
  }

}


export default Cart;
