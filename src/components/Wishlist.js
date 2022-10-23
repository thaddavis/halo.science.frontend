import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash.get";
import {
  addOwnedWish,
  removeOwnedWish,
  addWish,
  removeWish,
  getWishListState,
} from "../redux/actions/wishlist_actions";
import { markAsRead, unmarkAsRead } from "../redux/actions/book_actions";

export const Wishlist = () => {
  const [title, setTitle] = useState("");
  const wishlistState = useSelector((state) => state.wishlist);

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
                onClick={() => dispatch(removeWish(item))}
                className="button wishlist-button"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <h2>Owned Wishes</h2>
      <div>
        {wishlistItems.map((item) => {
          if (item.owned) {
            return (
              <div key={item.id} className="wishlist-item">
                {get(item, "wish_type") && (
                  <>
                    <div>{get(item, "wish_val.book.title")}</div>
                    {get(item, "wish_val.readings", []).length > 0 ? (
                      <button
                        type="button"
                        onClick={() => dispatch(unmarkAsRead(item))}
                        className="button wishlist-button"
                      >
                        Unmark As Read
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => dispatch(markAsRead(item))}
                        className="button wishlist-button"
                      >
                        Mark As Read
                      </button>
                    )}
                  </>
                )}
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
          placeholder="What would you like?"
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
      </form>
    </div>
  );
};
