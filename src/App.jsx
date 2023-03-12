import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert";
import CoinDetails from "./components/CoinDetails";
import Coins from "./components/Coins";
import Exchanges from "./components/Exchanges";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import { auth, db } from "./firebase";

function App() {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);

      const unsubscribe = onSnapshot(coinRef, coin => {
        if (coin.exists()) {
          // console.log(coin.data().coins);

          setWatchlist(coin.data().coins);
        }
        else {
          console.log("No Items in the WatchList ");
        }
      });
      return () => {
        unsubscribe();
      }
    }

  }, [user]);



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
      // console.log(user);
    });
  }, []);

  return (
    <Router>
      <Header alert={alert} setAlert={setAlert} user={user} watchlist={watchlist} />
      {/* <Alert /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/coin/:id" element={<CoinDetails user={user} watchlist={watchlist} alert={alert} setAlert={setAlert} />} />
      </Routes>
      <Alert alert={alert} setAlert={setAlert} />
      <Footer />
    </Router>
  );
}

export default App;
