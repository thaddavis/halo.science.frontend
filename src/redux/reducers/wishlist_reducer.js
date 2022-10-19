const initialState = {
  ownedBooks: [],
  wishlistUpdatedAt: new Date("2022-1-1"),
};

export const wishlist = (state = initialState, action) => {
  switch (action.type) {
    case "addOwnedBook": {
      return {
        ...state,
        ownedBooks: [...state.ownedBooks, action.payload],
      };
    }
    case "setWishListUpdatedAt": {
      return {
        wishlistUpdatedAt: action.payload,
      };
    }
    case "setOwnedBooks": {
      console.log("reducer");
      debugger;

      return {
        ...state,
        ownedBooks: action.payload,
      };
    }
    default:
      return state;
  }
};
