import { ADD_PRODUCT, REMOVE_PRODUCT } from '../actions'

export default function (state = [], {type, payload}) {
	switch (type) {
		case ADD_PRODUCT:
			const currentProduct = state.filter(product => product.title === payload.title)
			if (state.length === 0) {
					return [...state, payload]
			} else {
				if (currentProduct.length > 0) {
					return state.map((item) => {
						if (item.title === payload.title) {
							return {
								...item,  
								sold: payload.sold 
							}
						}
						return item;
					})
				} else {
					return [...state, payload]
				}
			}
			
		case REMOVE_PRODUCT:
			return state.filter(item => item.title !== payload)
		default: 
			return state
	}
}