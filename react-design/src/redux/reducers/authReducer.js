import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actions/authActions';

import {
  UPDATE_USERNAME_SUCCESS,
} from '../actions/userActions';

const initialState = {
  isAuthent: false, 
  token: null,
  loading: false,
  error: null,
  username: '', 
  firstName: '',
  lastName: '',
};

export function authReducer(state = initialState, action) {
  switch (action.type) {

      case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthent: true,
        token: action.payload.token,
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        loading: false,
        error: null,
      };

      case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error, // Stocke le message d'erreur dans l'état Redux
      };

    case UPDATE_USERNAME_SUCCESS:
      return {
        ...state,
        username: action.payload,
        loading: false,
        error: null,
      };

    case LOGOUT:
       return { 
        ...initialState,
      };

    default:
      return state;
  }
}
