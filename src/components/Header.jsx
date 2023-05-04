import React from 'react';
import { Link } from 'react-router-dom';
import AuthModal from "../Authentication/AuthModal"
import UserSidebar from "../Authentication/UserSidebar"

const Header = ({ alert, setAlert, user, watchlist }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark" >
      <div className="container-fluid" style={{ fontWeight: 500 }}>

        <Link className="navbar-brand" to="/" style={{ color: 'rgb(212,175,55)' }}>Home</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link className="nav-link active" to="/exchanges" style={{ color: 'rgb(212,175,55)' }}>Exchanges</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/coins" style={{ color: 'rgb(212,175,55)' }}>Coins</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/news" style={{ color: 'rgb(212,175,55)' }}>News</Link>
            </li>
          </ul>
          {user ? <UserSidebar user={user} alert={alert} setAlert={setAlert} watchlist={watchlist} /> : <AuthModal alert={alert} setAlert={setAlert} user={user} />}
        </div>
      </div>
    </nav>
  )
}

export default Header;
