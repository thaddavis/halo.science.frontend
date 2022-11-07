import { Routes, Route, Outlet } from "react-router-dom";
import { HomeContainer } from "./containers/HomeContainer";
import { WishlistContainer } from "./containers/WishlistContainer";
import { StatsContainer } from "./containers/StatsContainer";
import { ActionsContainer } from "./containers/ActionsContainer";

import { ToastContainer } from "react-toastify";

import { Nav } from "./components/Nav";
import { FirstOwnersV2 } from "./components/Stats/FirstOwners";
import { ReadingsHistory } from "./components/Stats/ReadingsHistory";
import { GenreStatsV2 } from "./components/Stats/GenreStats";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from './redux/actions/user_actions'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers())
  })

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/wishlist" element={<WishlistContainer />} />
        <Route path="/stats" element={<StatsContainer />}>
          <Route path="" element={<FirstOwnersV2 />} />
          <Route path="first-owners" element={<FirstOwnersV2 />} />
          <Route path="readings-history" element={<ReadingsHistory />} />
          <Route path="genre-stats" element={<GenreStatsV2 />} />
        </Route>
        <Route path="/actions" element={<ActionsContainer />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        ></Route>
      </Routes>
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default App;
