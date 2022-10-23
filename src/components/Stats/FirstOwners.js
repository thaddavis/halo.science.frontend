import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFirstOwners } from "../../redux/actions/book_actions";

export const FirstOwners = () => {
  const dispatch = useDispatch();
  const { firstOwners } = useSelector((state) => state.book);

  return (
    <>
      <h1>First Owners</h1>
      <button
        onClick={() => dispatch(getFirstOwners())}
        type="button"
        className="button"
      >
        Get First Owners
      </button>
      <br />
      <div>
        {firstOwners &&
          firstOwners.map((item) => {
            return (
              <div key={item.id} className="wishlist-item">
                <div>{item.title}</div>
                &nbsp;|&nbsp;
                <div>{item.first_name}</div>
                &nbsp;|&nbsp;
                <div>{item.last_name}</div>
                &nbsp;|&nbsp;
                <div>{item.first_owned}</div>
              </div>
            );
          })}
      </div>
    </>
  );
};
