import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  addOwnedBook,
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

    const {
      owned_books,
      wishlist,
      og_wishlist,
      id: wishlist_id,
      authors,
    } = response.data;

    dispatch(
      setWishListState({
        ownedBooks: owned_books,
        wishlist,
        ogItems: og_wishlist,
        wishlistId: wishlist_id,
        authors,
        wishlistUpdatedAt: new Date(),
      })
    );
  }

  const handleRemove = async (r) => {
    let id = wishlistState && wishlistState.ogItems[r].id;

    await axios.delete(
      `${process.env.REACT_APP_SERVER_HOST}/wishlist_items/${id}`
    );

    fetch();
  };

  const markAsOwned = (index) => {
    dispatch(addOwnedBook(wishlistState && wishlistState.ogItems[index]));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_HOST}/wishlist_items`, {
        wishlist: {
          wishlist_id: wishlistState && wishlistState.wishlistId,
          title,
          author,
        },
      });

      fetch();
    } catch (e) {
      console.log(e, e.code);
      toast.error(`Error: ${e.code}`);
    }
  };

  return (
    <div className="container" style={{ backgroundColor: "white" }}>
      <h1>My Wishlist</h1>
      <div>
        {wishlistState &&
          wishlistState.items &&
          wishlistState.items.map((item, index) => {
            return (
              <div
                key={wishlistState && wishlistState.items[index].id}
                className="wishlist-item"
              >
                <div>
                  "{item.title}" by{" "}
                  {wishlistState && wishlistState.authors[index].last_name}
                </div>
                <button
                  type="button"
                  onClick={() => markAsOwned(index)}
                  className="button wishlist-button"
                >
                  I Own This
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="button wishlist-button"
                >
                  Remove
                </button>
              </div>
            );
          })}
      </div>
      <h2>Owned Books</h2>
      <div>
        {wishlistState &&
          wishlistState.ownedBooks &&
          wishlistState.ownedBooks.map((item, index) => (
            <div
              key={wishlistState.ownedBooks[index].id}
              className="wishlist-item"
            >
              <div>{wishlistState.ownedBooks[index].id}</div>&nbsp;
              <div>{wishlistState.ownedBooks[index].title}</div>
            </div>
          ))}
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
        {inputsAllSpacesRef.current && (
          <div className="hint">Press escape to clear the fields</div>
        )}
      </form>
      <div className="hint">
        {wishlistState &&
          wishlistState.wishlistUpdatedAt &&
          wishlistState.wishlistUpdatedAt.toString()}
      </div>
    </div>
  );
};
