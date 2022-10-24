import { Routes, Route, Outlet } from "react-router-dom";
import { HomeContainer } from "./containers/HomeContainer";
import { WishlistContainer } from "./containers/WishlistContainer";
import { StatsContainer } from "./containers/StatsContainer";
import { ActionsContainer } from "./containers/ActionsContainer";

import { ToastContainer } from "react-toastify";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { Nav } from "./components/Nav";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/wishlist" element={<WishlistContainer />} />
        <Route path="/stats" element={<StatsContainer />} />
        <Route path="/actions" element={<ActionsContainer />} />
      </Routes>
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default App;
