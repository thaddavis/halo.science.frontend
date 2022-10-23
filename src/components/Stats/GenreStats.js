import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash.get";
import { getGenreStats } from "../../redux/actions/book_actions";

export const GenreStats = () => {
  const dispatch = useDispatch();
  const { genreStats } = useSelector((state) => state.book);
  const [genre, setGenre] = useState("");

  return (
    <>
      <h1>Genre Stats</h1>
      <br />
      <form className="form">
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select...</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
        </select>
        <button
          onClick={() => dispatch(getGenreStats(genre))}
          type="button"
          className="button"
        >
          Get Genre Stats
        </button>
      </form>
      <div>
        {genreStats && (
          <>
            <div>
              Avg. Book Length&nbsp;
              <span>{get(genreStats, "average_page_length")}</span>
            </div>
            &nbsp;|&nbsp;
            <div>
              % of Authors&nbsp;
              <span>{get(genreStats, "percentage_of_authors")}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};
