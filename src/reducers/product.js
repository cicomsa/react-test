import { UPDATE_PRODUCT } from '../actions'

export default function (state = [], {type, payload}) {
	switch (type) {
    case UPDATE_PRODUCT:
			return {
        ...state,
        ...payload
      }

		default: return state
	}
}