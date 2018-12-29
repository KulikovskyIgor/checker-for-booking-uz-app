import { ACTIONS } from '../actions/routes';

const actionsMap = {
  [ACTIONS.SET_ROUTE](state, action) {    
    return {
      ...state,
      [action.payload]: { url: action.payload }
    }
  },
  [ACTIONS.SET_ROUTE_DATA](state, action) {
    const { url, data } = action.payload;

    return {
      ...state,
      [url]: { 
        ...state[url],
        data
      }
    }
  },
  [ACTIONS.SET_ROUTE_UPDATED_DATA](state, action) {
    const { url, data } = action.payload;
    
    return {
      ...state,
      [url]: { 
        ...state[url],
        updatedData: data
      }
    }
  }
};

export default function routes(state = {}, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
