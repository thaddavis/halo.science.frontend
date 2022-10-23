const initialState = {
  readingsHistory: [],
};

export const book = (state = initialState, action) => {
  switch (action.type) {
    case "setReadingsHistory": {
      return {
        ...state,
        readingsHistory: action.payload,
      };
    }
    default:
      return state;
  }
};
