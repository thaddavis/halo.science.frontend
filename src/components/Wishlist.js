import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash.get";
import {
  addOwnedWish,
  removeOwnedWish,
  addWish,
  removeWish,
  getWishListState,
} from "../redux/actions/wishlist_actions";

import { BookCard } from "./wish_val_li_cards/Book";

// import { markAsRead, unmarkAsRead } from "../redux/actions/book_actions";
import { Modal } from "./Modal";

export function Wishlist() {
  const wishlistState = useSelector((state) => state.wishlist);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.log(userState)
    
    if (userState.id) dispatch(getWishListState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState]);

  const wishlistItems = get(wishlistState, "items", []);
  const wishlistId = get(wishlistState, "id", null);

  return (
    <>
      {modalOpen && (
        <Modal
          cancelAction={() => setModalOpen(!modalOpen)}
          successAction={(wish_type, wish_val) => {
            console.log("successAction");
            dispatch(
              addWish(wishlistId, wish_type, {
                title: wish_val,
              })
            );
            setModalOpen(!modalOpen);
          }}
        />
      )}
      <div className="px-4 sm:px-6 lg:px-8 py-2">
        <div className="sm:flex sm:items-center py-4">
          <div className="sm:flex-auto">
            {/* <h1 className="text-xl font-semibold text-gray-900">Wishlist</h1> */}
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              onClick={() => setModalOpen(!modalOpen)}
            >
              New wish
            </button>
          </div>
        </div>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item) => {
            let wish_val_ui;
            switch (get(item, "wish_type", null)) {
              case "Book":
                wish_val_ui = BookCard(
                  item,
                  !get(item, "owned", false)
                    ? () => dispatch(addOwnedWish(item))
                    : () => dispatch(removeOwnedWish(item)),
                  () => dispatch(removeWish(item))
                );
                break;
              default:
                wish_val_ui = "UNSUPPORTED WISH TYPE";
            }

            return wish_val_ui;
          })}
        </ul>
      </div>
    </>
  );
}
