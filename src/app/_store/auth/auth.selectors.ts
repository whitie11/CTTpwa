import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';
import jwt_decode from 'jwt-decode';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const getIsAuth = createSelector(selectAuthState,
    (state: AuthState) => state.isAuthenticated);

export const getUserName = createSelector(selectAuthState,
    (state: AuthState) =>
    {
       return state.userName;
    }
    );

export const getIsWaiting = createSelector(selectAuthState,
    (state: AuthState) => state.isWaiting);

export const getToken = createSelector(selectAuthState,
    (state: AuthState) => state.token);

export const getRole = createSelector(selectAuthState,
    (state: AuthState) => state.role);

export const getErrorMessage = createSelector(selectAuthState,
    (state: AuthState) => state.errorMessage);

export const getUserId = createSelector(selectAuthState,
    (state: AuthState) => {
        // console.log('token  ' + state.token);
        if (state.token) {
            const decoded: any = jwt_decode(state.token);
            const id = decoded.user_id;
            return id;
        }

        return null;
    }
);
