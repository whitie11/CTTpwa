import { Action, createAction, props } from '@ngrx/store';
import { LoginDTO } from 'src/app/models/loginDTO';
// import { LoginErrors } from 'src/app/models/logInErrors';


export const LogIn = createAction(
  '[Auth] Login',
  props<{ payload: LoginDTO}>()
);

export const LogInSuccess = createAction(
  '[Auth] Login Success',
  props<{ payload: any,  userName: string }>()
);

export const LogInFailure = createAction(
  '[Auth] Login Failure',
   props<{payload: string}>()
);

export const LogOut = createAction(
  '[Auth] LogOut',
  // props<{}>()
);
