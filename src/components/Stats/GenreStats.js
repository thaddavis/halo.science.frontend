import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash.get";
import { getGenreStats } from "../../redux/actions/book_actions";

export const GenreStatsV2 = () => {
  const dispatch = useDispatch();
  const { genreStats } = useSelector((state) => state.book);
  const firstUpdate = useRef(true);
  const [genre, setGenre] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (firstUpdate.current || !genre) {
      firstUpdate.current = false;
      return;
    }

    dispatch(getGenreStats(genre));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <form className="space-y-6 max-w-md" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Genre
          </label>
          <select
            id="location"
            name="location"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
          </select>
        </div>
      </form>
      {genreStats && (
        <div className="bg-gray-50 pt-12 sm:pt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Genre Statistics
              </h2>
            </div>
          </div>
          <div className="mt-10 bg-white pb-12 sm:pb-16">
            <div className="relative">
              <div className="absolute inset-0 h-1/2 bg-gray-50" />
              <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                  <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-2">
                    <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                      <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                        Avg. Page Length
                      </dt>
                      <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
                        {get(genreStats, "average_page_length", "-")}
                      </dd>
                    </div>
                    <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                      <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                        % of All Authors
                      </dt>
                      <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
                        {get(genreStats, "percentage_of_authors", "-")}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
