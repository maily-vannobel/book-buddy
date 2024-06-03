import React from 'react';
import { Link } from 'react-router-dom';
import logobook from '../logobook.png';
import '../css/header-footer.css';

function Nav() {
  return (
    <>
 <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/">
        <img src={logobook} alt="Book Buddy Logo" width="30" height="30" className="d-inline-block align-top" />
        {' '}
        Book Buddy
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Accueil</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/collections">Collections</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profil">Profil</Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
}

export default Nav;
