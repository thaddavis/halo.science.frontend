import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

export const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [ogItems, setOGItems] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [theme, setTheme] = useState("");

  const inputsAllSpacesRef = useRef(false);

  const counter = useSelector((state) => state.counter);
  const { id } = useSelector((state) => state.user);
  const { wishlistUpdatedAt } = useSelector((state) => state.wishlist);

  console.log("wishlistUpdatedAt", wishlistUpdatedAt);

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
      const response = await axios.get("http://localhost:3000/wishlist", {
        params: {
          user_id: id,
        },
      });

      const { wishlist, og_wishlist } = response.data;

      setItems(wishlist);
      setOGItems(og_wishlist);
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

    // let id = ogItems[r].id;

    // const response = await axios.delete(`/wishlist_items/${id}`);

    // const { removedItem } = response.data;

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
    const response = await axios.post("/wishlist_items", {
      user_id: id,
      title,
      author,
    });
    const { addedItem } = response.data;
    dispatch(setWishListUpdatedAt());
    setItems(items.push(addedItem));
  };

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
              "{item.title}" by {item.author}
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
        <button type="button" className="button">
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
