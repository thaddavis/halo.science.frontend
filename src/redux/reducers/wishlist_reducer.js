const initialState = {
  ownedBooks: [],
  wishlistUpdatedAt: new Date(),
  items: [],
  authors: [],
  wishlistId: null,
};

export const wishlist = (state = initialState, action) => {
  switch (action.type) {
    case "addOwnedWish": {
      return {
        ...state,
        ownedBooks: [...state.ownedBooks, action.payload],
      };
    }
    case "removeOwnedWish": {
      return state;
    }
    case "setWishListState": {
      return {
        ...state,
        updatedAt: action.payload.updatedAt,
        items: action.payload.items,
        id: action.payload.id,
      };
    }
    default:
      return state;
  }
};
