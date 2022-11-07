import { SET_USER } from "../constants/ActionTypes";

const initialState = {
  id: null
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: 
      return {
        ...state,
        id: action.payload
      }
    default:
      return state;
  }
};
