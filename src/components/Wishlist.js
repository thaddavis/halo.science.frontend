import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setWishListUpdatedAt,
  addOwnedBook,
  setOwnedBooks,
} from "../redux/actions/wishlist_actions";

import { toast } from "react-toastify";

export const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [ogItems, setOGItems] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [theme, setTheme] = useState("");
  const [wishlistId, setWishlistId] = useState();

  const inputsAllSpacesRef = useRef(false);

  const counter = useSelector((state) => state.counter);
  const { id } = useSelector((state) => state.user);
  // * PR REVIEW * you need to first access the slice of the reducer before getting the `wishlistUpdatedAt` ie: `state.wishlist.wishlistUpdatedAt` property
  const { wishlistUpdatedAt, ownedBooks } = useSelector(
    (state) => state.wishlist
  );

  console.log("___ ___", ownedBooks);

  const dispatch = useDispatch();

  useEffect(() => {
    // If both inputs contain non-empty strings consisting of all spaces,
    // user can press escape to reset them
    const handleKeypress = (e) => {
      if (e.keyCode === 27) {
        setTitle("");
        setAuthor("");
      }
    };

    document.addEventListener("keyup", handleKeypress);

    setTheme("normal");
    fetch();
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

    debugger;

    setItems(wishlist);
    setOGItems(og_wishlist);
    setWishlistId(wishlist_id);
    setAuthors(authors);
    dispatch(setOwnedBooks(owned_books));
  }

  const handleRemove = async (r) => {
    let id = ogItems[r].id;

    await axios.delete(
      `${process.env.REACT_APP_SERVER_HOST}/wishlist_items/${id}`
    );

    const updatedList = items.filter((item, index) => {
      return index !== r;
    });
    setItems(updatedList);

    const updatedOgItems = ogItems.filter((item, index) => {
      return index !== r;
    });
    setOGItems(updatedOgItems);

    const updatedAuthors = authors.filter((item, index) => {
      return index !== r;
    });
    setAuthors(updatedAuthors);

    dispatch(setWishListUpdatedAt());
  };

  const markAsOwned = (index) => {
    dispatch(addOwnedBook(ogItems[index]));
    console.log("ogItems[index]", ogItems[index]);
    // handleRemove(index);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOST}/wishlist_items`,
        {
          wishlist: {
            wishlist_id: wishlistId,
            title,
            author,
          },
        }
      );
      dispatch(setWishListUpdatedAt());
      fetch();
    } catch (e) {
      console.log(e, e.code);
      toast.error(`Error: ${e.code}`);
    }
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: theme === "normal" ? "white" : "black" }}
    >
      <h1>My Wishlist</h1>
      <div>
        {items.map((item, index) => (
          <div key={ogItems[index].id} className="wishlist-item">
            <div>
              "{item.title}" by {authors[index].last_name}
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
        ))}
      </div>
      <h2>Owned Books</h2>
      <div>
        {ownedBooks.map((item, index) => (
          <div key={ownedBooks[index].id} className="wishlist-item">
            <div>{index}</div>
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
      <div className="hint">{wishlistUpdatedAt.toString()}</div>
    </div>
  );
};
