import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {fetchProducts} from '../actions/products'
import {SearchForm} from '../components/SearchForm'

export const displayProducts = (check, contentTitle, products) => {
  if (check.state.category === undefined) {
    return contentTitle(products)
  } else {
    const filteredProducts = products.filter(product => 
      product.title.toLowerCase().includes(check.state.category.toLowerCase())
    )
    return contentTitle(filteredProducts)
  } 
}

export const handleChange = (check, event) => {
  const { name, value } = event.target;

  check.setState({
    [name]: value
  });
};

class CategoriesPage extends PureComponent {
  state = {}
  componentWillMount() {
      this.props.fetchProducts();
    }

  render() {
    const products = this.props.products
    if (!products) return null

    let categories = products.map(product => product.category)
    categories = [...new Set(categories)]

    const productTitles = () => {
      const contentTitle = products => 
        products.map(product => 
          `${product.title.toUpperCase()} ${product.new === true ? '- NEW' : ''}`
        )

      return displayProducts(this, contentTitle, products)
    }
   
    return (
      <section>
        <div className="categories">
          {categories.map(category => 
          <Link key={category} to={`/categories/${category}`}>{category}</Link>
          )}
        </div>
        <br/>
        <SearchForm category={this.state.category} change={e => handleChange(this, e)}/>
        <div className="products">
          {productTitles().map(title => 
            <Link key={title} to={`/products/${title.split(' - NEW')[0].toLowerCase()}`}>{title}</Link>
          )}
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
     products: state.products
   }
}

export default connect(mapStateToProps, { fetchProducts })(CategoriesPage)