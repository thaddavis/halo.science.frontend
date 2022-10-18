import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

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
  const { wishlistUpdatedAt } = useSelector((state) => state.wishlist);

  console.log("wishlistUpdatedAt", wishlistUpdatedAt);
  // * PR REVIEW * async in useEffect causes issues - async function needs to be inside useEffect
  const dispatch = useDispatch();

  useEffect(() => {
    // If both inputs contain non-empty strings consisting of all spaces,
    // user can press escape to reset them
    const handleKeypress = (e) => {
      if (inputsAllSpacesRef.current && e.keyCode === 27) {
        setTitle("");
        setAuthor("");
      }
    };

    document.addEventListener("keyup", handleKeypress);

    async function fetch() {
      // * PR REVIEW * GET requests don't have a body so make second param URL params
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOST}/wishlist`,
        {
          params: {
            user_id: id,
          },
        }
      );

      const { wishlist, og_wishlist, id: wishlist_id, authors } = response.data;

      // debugger;

      setItems(wishlist);
      setOGItems(og_wishlist);
      setWishlistId(wishlist_id);
      setAuthors(authors);
    }

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

  const handleRemove = async (r) => {
    console.log("r", r);

    let id = ogItems[r].id;

    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_HOST}/wishlist_items/${id}`
    );

    const { removedItem } = response.data;

    const updatedList = items.filter((item, index) => {
      console.log("index", index, "r", r);

      return index !== r;
    });

    console.log("updatedList", updatedList);

    // dispatch(setWishListUpdatedAt());
    setItems(updatedList);
  };

  const markAsOwned = (book) => {
    // addOwnedBook(book);
    handleRemove(book.id);
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
      const { addedItem } = response.data;

      // debugger;

      // dispatch(setWishListUpdatedAt());
      // setItems(items.push(addedItem));
    } catch (e) {
      toast.error("Wow so easy!");
    }
  };

  console.log("items", items, ogItems);
  console.log("authors", authors[0]);

  return (
    <div
      className="container"
      style={{ backgroundColor: theme === "normal" ? "white" : "black" }}
    >
      <h1 className="title">My Wishlist</h1>
      <div>
        {items.map((item, index) => (
          <div key={item.id} className="wishlist-item">
            <div>
              "{item.title}" by {authors[index].last_name}
            </div>
            <button
              type="button"
              onClick={() => markAsOwned(item)}
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
      {/* wishlistUpdatedAt is an object so needs to be converted to a primitive ie: `wishlistUpdatedAt.toString()` */}
      <div className="hint">{wishlistUpdatedAt.toString()}</div>
    </div>
  );
};
