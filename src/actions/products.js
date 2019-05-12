
import * as request from 'superagent'
import { FETCH_PRODUCTS, ADD_PRODUCT, REMOVE_PRODUCT, UPDATE_PRODUCT } from './index'

const baseUrl = 'https://my-json-server.typicode.com/spokeldn/react-test/db'

export const fetchProducts = () => dispatch => {
  request
    .get(`${baseUrl}`)
    .then(response => 
      dispatch({
        type: FETCH_PRODUCTS,
        payload: response.body.products
      })
    )
    .catch(err => console.log(err));
};

export const addProduct = id => dispatch => {
  dispatch({
    type: ADD_PRODUCT,
    payload: id
  })
}

export const removeProduct = id => dispatch => {
  dispatch({
    type: REMOVE_PRODUCT,
    payload: id
  })
}

export const updateProduct = (id, updates) => dispatch => {
  dispatch({
    type: UPDATE_PRODUCT,
    payload: updates
  })
};