export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const login = (email, password) => async (dispatch) => {
  try {
  
    const response = await fetch('http://localhost:3001/api/v1/user/login', {    // Étape 1: Récupérer le token
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Envoie l'email et le mot de passe au server
    });

    if (!response.ok) {
      throw new Error('Erreur d\'authentification'); 
    }

    const data = await response.json();
    const token = data.body.token;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, username: '', firstName: '', lastName: '' }, // dispatch token et valeurs provisoires vides pour les autres infos
    });

   
    const profileResponse = await fetch('http://localhost:3001/api/v1/user/profile', {   // Étape 2: récupérer le profil utilisateur
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Utilise le token pour récupérer le profil utilisateur
      },
    });

    if (!profileResponse.ok) {
      throw new Error('Erreur récupération du profil'); 
    }

    const profileData = await profileResponse.json();
    const { userName: username, firstName, lastName } = profileData.body;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, username, firstName, lastName },  // dispatch token avec valeurs du profil
    });
  } catch (error) {

    dispatch({
      type: LOGIN_FAILURE,
      payload: { error: error.message },
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT, // Envoie l'action de déconnexion au store Redux
  });
};
