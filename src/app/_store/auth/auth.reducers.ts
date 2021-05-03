import { Action, createReducer, on } from '@ngrx/store';
// import { All, AuthActionTypes } from './auth.actions';
import * as AuthActions from './auth.actions';

export interface AuthState {
  userName: string ;
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  token: string | null;
  // error message
  errorMessage: string | null;
  role: string | null;
  isWaiting: boolean;
}

export const initialState: AuthState = {
  userName: 'Not Defined!',
  isAuthenticated: false,
  token: null,
  errorMessage: null,
  role: null,
  isWaiting: false
};

// //  //
// export const intialState = initializeState();

const reducer = createReducer(
  initialState,
  on(AuthActions.LogIn, (state: AuthState, { payload }) => {
    return { ...state, isWaiting: true };
  }),
  on(AuthActions.LogInSuccess, (state: AuthState, { payload, userName}) => {
   // console.log('logged in ');
    return {
      ...state,
      userName,
      isAuthenticated: true,
      isWaiting: false,
      errorMessage: null,
      token: payload.token,
      role: payload.role,
    };
  }),
  on(AuthActions.LogInFailure, (state: AuthState, { payload }) => {
  //  console.log('logged in  failed   ' + payload);
    return {
      ...state, isAuthenticated: false,
      isWaiting: false, errorMessage: payload,
      token: null, role: null,
      userName: 'Not Defined!'
    };
  }),
  on(AuthActions.LogOut, (state: AuthState, {}) => {
    return {
      ...state, isAuthenticated: false,
      isWaiting: false, errorMessage: null,
      token: null, role: null,
      userName: 'Not Defined!'
    };
  }),
);

export function authReducer(state: AuthState | undefined, action: Action): any {
  return reducer(state, action);
}


