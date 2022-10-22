import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash.get";
import {
  addOwnedWish,
  removeOwnedWish,
  setWishListState,
} from "../redux/actions/wishlist_actions";

import { toast } from "react-toastify";

export const Wishlist = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const inputsAllSpacesRef = useRef(false);
  const wishlistState = useSelector((state) => state.wishlist);
  const { id } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeypress = (e) => {
      if (e.keyCode === 27) {
        setTitle("");
        setAuthor("");
      }
    };
    document.addEventListener("keyup", handleKeypress);

    fetch();

    return () => {
      document.removeEventListener("keyup", handleKeypress);
    };
  }, []);

  useEffect(() => {
    if (title.length && !title.trim() && author.length && !author.trim()) {
      inputsAllSpacesRef.current = true;
    } else {
      inputsAllSpacesRef.current = false;
    }
  }, [title, author]);

  async function fetch() {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_HOST}/wishlist`,
      {
        params: {
          user_id: id,
        },
      }
    );

    const { updated_at, id: wishlist_id, items } = response.data;

    dispatch(
      setWishListState({
        items: items,
        id: wishlist_id,
        updatedAt: updated_at,
      })
    );
  }

  const handleRemove = async (item) => {
    console.log("r", item);

    let id = item.id;

    await axios.delete(
      `${process.env.REACT_APP_SERVER_HOST}/wishlist_items/${id}`
    );

    fetch();
  };

  const markAsOwned = (item) => {
    console.log("item", item);

    dispatch(addOwnedWish(item));
  };

  const removeAsOwned = (item) => {
    console.log("item", item);

    dispatch(removeOwnedWish(item));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_HOST}/wishlist_items`, {
        wishlist: {
          wishlist_id: wishlistId,
          title,
          author,
          thing_type: "Book",
        },
      });

      fetch();
    } catch (e) {
      console.log(e, e.code);
      toast.error(`Error: ${e.code}`);
    }
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
                  onClick={() => markAsOwned(item)}
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
                  onClick={() => removeAsOwned(item)}
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
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={handleSubmit} type="button" className="button">
          Submit
        </button>
        {/* {inputsAllSpacesRef.current && (
          <div className="hint">Press escape to clear the fields</div>
        )} */}
      </form>
    </div>
  );
};
