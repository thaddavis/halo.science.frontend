import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash.get";
import {
  addOwnedWish,
  removeOwnedWish,
  addWish,
  removeWish,
  getWishListState,
} from "../redux/actions/wishlist_actions";

import { toast } from "react-toastify";

export const Wishlist = () => {
  const [title, setTitle] = useState("");

  const inputsAllSpacesRef = useRef(false);
  const wishlistState = useSelector((state) => state.wishlist);
  const { id } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeypress = (e) => {
      if (e.keyCode === 27) {
        setTitle("");
      }
    };
    document.addEventListener("keyup", handleKeypress);

    dispatch(getWishListState());

    return () => {
      document.removeEventListener("keyup", handleKeypress);
    };
  }, []);

  useEffect(() => {
    if (title.length && !title.trim()) {
      inputsAllSpacesRef.current = true;
    } else {
      inputsAllSpacesRef.current = false;
    }
  }, [title]);

  const handleRemove = async (item) => {
    console.log("r", item);

    let id = item.id;

    await axios.delete(
      `${process.env.REACT_APP_SERVER_HOST}/wishlist_items/${id}`
    );

    dispatch(getWishListState());
  };

  const wishlistItems = get(wishlistState, "items", []);
  const wishlistLastUpdatedAt = get(wishlistState, "updatedAt", null);
  const wishlistId = get(wishlistState, "id", null);

  return (
    <div className="container" style={{ backgroundColor: "white" }}>
      <h1>
        My Wishlist &nbsp;
        <small className="hint">
          {wishlistLastUpdatedAt && wishlistLastUpdatedAt.toString()}
        </small>
      </h1>
      <div>
        {wishlistItems.map((item) => {
          return (
            <div key={item.id} className="wishlist-item">
              <div>
                {get(item, "wish_type", null)} - "
                {get(item, "wish_val.book.title", null)}" by{" "}
                {get(item, "wish_val.author.first_name", null)}
              </div>
              {!get(item, "owned", false) && (
                <button
                  type="button"
                  onClick={() => dispatch(addOwnedWish(item))}
                  className="button wishlist-button"
                >
                  I Own This
                </button>
              )}
              <button
                type="button"
                onClick={() => handleRemove(item)}
                className="button wishlist-button"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <h2>Owned Books (Fulfilled)</h2>
      <div>
        {wishlistItems.map((item) => {
          if (item.owned) {
            return (
              <div key={item.id} className="wishlist-item">
                <div>{get(item, "wish_val.book.title")}</div>
                <button
                  type="button"
                  onClick={() => dispatch(removeOwnedWish(item))}
                  className="button wishlist-button"
                >
                  Not Anymore!
                </button>
              </div>
            );
          }

          return null;
        })}
      </div>
      <form className="form">
        <input
          type="text"
          placeholder="Enter book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={() =>
            dispatch(
              addWish(wishlistId, "Book", {
                title,
              })
            )
          }
          type="button"
          className="button"
        >
          Submit
        </button>
        {/* {inputsAllSpacesRef.current && (
          <div className="hint">Press escape to clear the fields</div>
        )} */}
      </form>
    </div>
  );
};
