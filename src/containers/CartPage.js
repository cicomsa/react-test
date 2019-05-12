import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {removeProduct} from '../actions/products'
import {DiscountInput} from '../components/DiscountInput';

class CartPage extends PureComponent {
  state = {}

  removeFromCart = title => {
    this.props.removeProduct(title)
  }

  render() {
    const { cart } = this.props
    if (!cart) return null

    const applyDiscount = event => {
      const { name, value } = event.target;
      this.setState({[name]: value});
    }

    let total = cart.length === 0 
      ? 0.00
      : cart.length === 1
        ? cart[0].price * cart[0].sold
        : cart.reduce((a, b) => (a.price * a.sold) + (b.price * b.sold)).toFixed(2)  

    if (this.state.discount === '20') {
      total = (total - (total * 0.2)).toFixed(2)
    } 

    return (
      <section>
        <Link className="back-link" to="/categories">To All Categories</Link>
        <h2 className="cart-title">Cart...</h2>
        {cart.map(product => 
        <div key={product.title + product.id}>
          <p>Product: {product.title}</p>
          <p>Price: {(product.price * product.sold).toFixed(2)}</p>
          <button onClick={() => this.removeFromCart(product.title)}>Remove</button>
        </div>
        )}
        <hr />
        <h3>Total: £{total}</h3>
        <p>Apply discount:</p>
        <DiscountInput discount={this.state.discount} apply={e => applyDiscount(e)}/>
        <button className="checkout">Checkout</button>
      </section>
    )
  }
}

const mapStateToProps = function (state) {
  return {
     cart: state.cart
   }
}

export default connect(mapStateToProps, { removeProduct })(CartPage)