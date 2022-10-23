const initialState = {
  readingsHistory: [],
  setFirstOwners: [],
  genreStats: null,
};

export const book = (state = initialState, action) => {
  switch (action.type) {
    case "setReadingsHistory": {
      return {
        ...state,
        readingsHistory: action.payload,
      };
    }
    case "setFirstOwners": {
      return {
        ...state,
        firstOwners: action.payload,
      };
    }
    case "setGenreStats": {
      console.log("setGenreStats", action.payload);
      return {
        ...state,
        genreStats: action.payload,
      };
    }
    default:
      return state;
  }
};
