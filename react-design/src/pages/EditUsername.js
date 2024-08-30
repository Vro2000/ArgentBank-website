import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUsername } from '../redux/actions/userActions';
import Header from '../components/Header';
import Footer from '../components/Footer';

function EditUsername() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, firstName, lastName, username: reduxUsername } = useSelector((state) => state.auth); // Récupère les données utilisateur depuis Redux
  const [username, setUsername] = useState(reduxUsername || '');


  const handleUsernameChange = (event) => {
    event.preventDefault();
    dispatch(updateUsername(username, token)); // Déclenche l'action upadateUsername de usersActions avec le nom d'utilisateur et le token
    navigate('/user'); // Redirige vers la page utilisateur après la mise à jour
  };

  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <h1>Edit Username</h1>
          <form onSubmit={handleUsernameChange}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Met à jour l'état local "username" avec la valeur entrée par l'utilisateur
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}  // Affiche le prénom (readonly)
                readOnly
                className="readonly-input"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}  // Affiche le nom de famille (readonly)
                readOnly
                className="readonly-input"
              />
            </div>
            <button type="submit" className="sign-in-button">
              Save
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default EditUsername;