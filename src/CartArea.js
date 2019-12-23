import React from 'react';
import './App.css';
import Cart from './Cart';

class CartArea extends React.Component {
  
  getCartCourses() {
    console.log(this.props);
    let cartCourses = [];

    for(const cartCourse of Object.entries(this.props.data)) {
      cartCourses.push (
        <Cart key={cartCourse[0]} data={cartCourse[1]} setCartCourses={this.props.setCartCourses}/>
      )
    }
    console.log(cartCourses);
    return cartCourses;
  }

  render() {
    return (
      <div style={{margin: '5px'}}>
        {this.getCartCourses()}
      </div>
    )
  }
}

export default CartArea;
