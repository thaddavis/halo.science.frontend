import axios from "axios";

export const addOwnedBook = (book) => {
  console.log("addOwnedBook", book);

  return async function (dispatch, getState) {
    console.log("thunk");

    // const response = await axios.post("/owned_books", {
    //   book,
    // });

    // dispatch({
    //   type: "addOwnedBook",
    //   payload: response.data.book,
    // });

    // return response.data.book;
  };
};

export const setWishListUpdatedAt = () => ({
  type: "setWishListUpdatedAt",
  payload: new Date(),
});
