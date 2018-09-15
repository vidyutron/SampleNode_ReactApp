import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/is-empty";
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    // case TEST_DISPATCH:
    //   return {
    //     //this spreads - adds on top of existing object
    //     //we do not cnage the state, we only make copy of it
    //     ...state,
    //     //fill user with the payload, which is userData
    //     user: action.payload
    //   };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
