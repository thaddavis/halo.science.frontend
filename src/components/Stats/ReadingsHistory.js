import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash.get";
import { searchReadingsForBook } from "../../redux/actions/book_actions";

export function ReadingsHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { readingsHistory } = useSelector((state) => state.book);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchReadingsForBook(searchTerm));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <form className="space-y-6 max-w-md" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Search
          </label>
          <div className="mt-1">
            <input
              id="wish_type"
              name="wish_type"
              type="text"
              placeholder="Book title"
              value={searchTerm}
              onBlur={handleSubmit}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </form>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Book
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Genre
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Author
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Reader
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Last read
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {readingsHistory &&
                    readingsHistory.map((reading) => (
                      <tr key={reading.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {get(reading, "book.title")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {get(reading, "book.genre")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {get(reading, "author.first_name") +
                            " " +
                            get(reading, "author.last_name")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {get(reading, "user.first_name") +
                            " " +
                            get(reading, "user.last_name")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {get(reading, "last_read") &&
                            new Date(
                              get(reading, "last_read")
                            ).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
