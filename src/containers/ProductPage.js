import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {fetchProducts, addProduct, updateProduct} from '../actions/products'
import {displayProducts} from './CategoriesPage'

class ProductPage extends PureComponent {
  closeFullDescription = React.createRef();
  description = React.createRef();
  state = {}

  componentWillMount() {
    this.props.fetchProducts();
  }

  closeDescription = description => {
    const closeFullDescription = this.closeFullDescription.current
    const descriptionTag = this.description.current
    descriptionTag.innerHTML = description
    descriptionTag.setAttribute('data-gradient', '')
    closeFullDescription.setAttribute('data-hidden', '')
  }

  openDescription = (e, fullDescription) => {
    const closeFullDescription = this.closeFullDescription.current
    e.target.innerHTML = fullDescription
    e.target.removeAttribute('data-gradient')
    closeFullDescription.removeAttribute('data-hidden')
  }
  
  addToCart = product => {
    product.sold = product.sold ? product.sold + 1 : 1
    this.props.addProduct(product)
  }

  handleChange = e => {
    this.setState({value: e.target.value});
  }

  render() {
    const { products, cart } = this.props
    if (!products) return null

    const currentProduct = () => {
      const contentTitle = products => 
        products
        .filter(product =>
          product.title.toLowerCase().includes(this.props.match.params.id.toLowerCase().trim())
        )
      
      return displayProducts(this, contentTitle, products)
    }

    const sold = (inCart, currentProduct, amountAvailable) => {
      if (inCart.length > 0) {
        currentProduct()[0].sold = inCart[0].sold 
        return currentProduct()[0].sold === amountAvailable
      }  
    }

    const title = currentProduct().map(product => `${product.title.toUpperCase()} ${product.new === true ? '- NEW' : ''}`)
    const price = currentProduct().map(product => `£${product.price}`)
    const description = currentProduct().map(product => `${product.description.split(' tempor')[0]}...`)
    const fullDescription = currentProduct().map(product => product.description)
    const amountAvailable = currentProduct().map(product => product.amount)[0]
    let categories = products.map(product => product.category)
    const inCart = cart.filter(item => currentProduct()[0].title === item.title)
    categories = [...new Set(categories)]
    let amounts = []

    for (let i = 1; i <= amountAvailable; i++) {
      amounts.push(<option key={i} value={i}>{i}</option>)
    }

    return (
      <section>
        <div className="categories">
          {categories.map(product => 
          <Link key={product} to={`/categories/${product}`}>{product}</Link>
          )}
        </div>

        <div className="products">
          <p>{title}</p>
          <img src="https://dummyimage.com/400x600/000/fff" alt="product"/>
          <p>{price}</p>
          <p className="description" data-gradient ref={this.description} onClick={e => this.openDescription(e, fullDescription)}>{description}</p> 
          <p className="close-description" data-hidden ref={this.closeFullDescription} onClick={() => this.closeDescription(description)}>Close Description</p>
        </div>
        { !sold(inCart, currentProduct, amountAvailable)
        ? <div className="add-to-cart">
            <button onClick={() => this.addToCart(currentProduct()[0])}> Add to Cart</button>
          </div>
        : <p>Stock not available</p> }
        <Link className="cart-link" to="/cart">Your Cart</Link>
      </section>
    )
  }
}

const mapStateToProps = function (state) {
  return {
     products: state.products,
     cart: state.cart
   }
}

export default connect(mapStateToProps, { fetchProducts, addProduct, updateProduct })(ProductPage)