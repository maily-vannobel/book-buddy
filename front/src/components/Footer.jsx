import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header-footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <ul className="nav justify-content-center">
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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
