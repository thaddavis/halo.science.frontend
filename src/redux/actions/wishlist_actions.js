import axios from "axios";
import get from "lodash.get";

export const addOwnedBook = (book) => {
  console.log("addOwnedBook", book);

  return async function (dispatch, getState) {
    console.log("thunk", getState());

    let state = getState();
    let user_id = get(state, "user.id", null);

    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_HOST}/owned_books`,
      {
        book_id: book.id,
        user_id: user_id,
      }
    );

    console.log(response);

    dispatch({
      type: "addOwnedBook",
      payload: response.data,
    });
  };
};

export const setWishListUpdatedAt = () => ({
  type: "setWishListUpdatedAt",
  payload: new Date(),
});

export const setOwnedBooks = (ownedBooks) => {
  console.log("setOwnedBooks", ownedBooks);

  return {
    type: "setOwnedBooks",
    payload: ownedBooks,
  };
};
