export const UPDATE_USERNAME_SUCCESS = 'UPDATE_USERNAME_SUCCESS';
export const UPDATE_USERNAME_FAILURE = 'UPDATE_USERNAME_FAILURE';

export const updateUsername = (username, token) => async (dispatch) => {

  try {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ userName: username }),  // Envoie le nouveau nom d'utilisateur
    });

    if (!response.ok) {
      throw new Error('Failed to update username');
    }

    dispatch({
      type: UPDATE_USERNAME_SUCCESS,
      payload: username,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USERNAME_FAILURE,
      payload: error.message,
    });
  }
};
