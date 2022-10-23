import { useState } from "react";
import { giveAwayPossessions } from "../redux/actions/user_actions";
import { searchReadingsForBook } from "../redux/actions/book_actions";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash.get";

export function ActionsContainer() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { readingsHistory } = useSelector((state) => state.book);

  console.log("render ActionsContainer", readingsHistory);

  return (
    <>
      <main>
        <h2>Actions</h2>
        <button
          className="button"
          onClick={() => dispatch(giveAwayPossessions())}
        >
          Give It All Away!
        </button>
        <hr />
        <form className="form">
          <input
            type="text"
            placeholder="Enter The Title Of A Book"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => dispatch(searchReadingsForBook(searchTerm))}
            type="button"
            className="button"
          >
            Search Reads
          </button>
        </form>
        <br />
        {readingsHistory.map((item) => {
          console.log("_-_-_");

          return (
            <div key={item.id} className="wishlist-item">
              <div>{get(item, "user.first_name")}</div>
              &nbsp;|&nbsp;
              <div>{get(item, "book.title")}</div>
            </div>
          );
        })}
      </main>
    </>
  );
}
