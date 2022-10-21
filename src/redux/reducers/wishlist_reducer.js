const initialState = {
  ownedBooks: [],
  wishlistUpdatedAt: new Date("2022-1-1"),
  items: [],
  authors: [],
  wishlistId: null,
};

export const wishlist = (state = initialState, action) => {
  switch (action.type) {
    case "addOwnedBook": {
      return {
        ...state,
        ownedBooks: [...state.ownedBooks, action.payload],
      };
    }
    case "setWishListState": {
      return {
        ...state,
        wishlistUpdatedAt: new Date("2022-1-1"),
        items: action.payload.wishlist,
        ogItems: action.payload.ogItems,
        authors: action.payload.authors,
        wishlistId: action.payload.wishlistId,
        ownedBooks: action.payload.ownedBooks,
      };
    }
    default:
      return state;
  }
};
