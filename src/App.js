import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import CategoriesPage from './containers/CategoriesPage';
import CategoryPage from './containers/CategoryPage';
import ProductPage from './containers/ProductPage'
import CartPage from './containers/CartPage'
import './App.css';

class App extends PureComponent {
  render() {
    return (
      <Router> 
        <div className="App">
          <Route exact path="/categories" component={CategoriesPage} />
          <Route exact path="/categories/:id" component={CategoryPage} />
          <Route exact path="/products/:id" component={ProductPage} />
          <Route exact path="/cart" component={CartPage} />
          <Route exact path="/" render={() => <Redirect to="/categories" />}/>
        </div>
      </Router>
    );
  }
}

export default App;
