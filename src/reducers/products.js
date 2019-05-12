import { FETCH_PRODUCTS } from '../actions'

export default function (state = [], {type, payload}) {
	switch (type) {
    case FETCH_PRODUCTS:
			return payload

		default: return state
	}
}