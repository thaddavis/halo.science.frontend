import { Link, Routes, Route, Outlet } from "react-router-dom";
import { HomeContainer } from "./containers/HomeContainer";
import { WishlistContainer } from "./containers/WishlistContainer";
import { StatsContainer } from "./containers/StatsContainer";

import "./styles.css";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        &nbsp;|&nbsp;
        <Link to="/wishlist">Wishlist</Link>
        &nbsp;|&nbsp;
        <Link to="/stats">Stats</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="wishlist" element={<WishlistContainer />} />
        <Route path="stats" element={<StatsContainer />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
