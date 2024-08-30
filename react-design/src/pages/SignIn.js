import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import Header from '../components/Header';
import Footer from '../components/Footer';

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);  // Récupère l'état d'authentification du store Redux
  const [email, setEmail] = useState(''); // Gére l'état local pour l'email
  const [password, setPassword] = useState(''); // Gére l'état local pour le mot de passe

  const handleSignIn = (event) => {
    event.preventDefault();
    dispatch(login(email, password));   // Déclenche l'action login de authAction avec les données entrées
  };

  useEffect(() => {
    if (auth.isAuthent) {
      navigate('/user'); // Dirige vers la page utilisateur si l'authentification est réussie
    }
  }, [auth.isAuthent, navigate]);

  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSignIn}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="sign-in-button">Sign In</button>
            {auth.error && <p className="error">{auth.error}</p>}  {/* Affiche un message d'erreur si auth.error est défini */}
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default SignIn;
