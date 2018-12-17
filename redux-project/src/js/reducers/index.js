import { UPDATE_USER } from "../constants/action-types";

const initialState = {
	articles: [],
	users: [
		{
			id: 1,
			name: 'John Doe',
		},
		{
			id: 2,
			name: 'Alice'
		},
		{
			id: 3,
			name: 'Bob',
		}
	],
	projects: [
		{
			id: 1,
			name: 'Trip to space'
		},
		{
			id: 2,
			name: 'Assembly Ikea furniture'
		},
		{
			id: 3,
			name: 'Datumize Zentral'
		}
	],
	roles: [
		{
			id: 1,
			name: 'Admin'
		},
		{
			id: 2,
			name: 'Editor'
		},
		{
			id: 3,
			name: 'Viewer'
		}
	],

};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
      	case UPDATE_USER:
            return Object.assign({}, state, {
               users: state.users.map(item => {
                   return item.id === action.payload.id ? action.payload : item;
               }) // replace matched item and returns the array 
            })
    	default:
      		return state;
  	}
};

export default rootReducer;
