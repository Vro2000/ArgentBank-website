import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions';

function Header() {
  const isAuthent = useSelector((state) => state.auth.isAuthent);  // Récupère l'état d'authentification du store Redux
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());  // Déclenche l'action de déconnexion via Redux
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.webp"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthent ? (  // Si l'utilisateur est authentifié
          <a className="main-nav-item" href="/" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i>
            &nbsp;Sign Out
          </a>
        ) : (  // Si l'utilisateur n'est pas authentifié
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            &nbsp;Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
