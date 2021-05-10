import { ActionReducerMap } from '@ngrx/store';
import * as auth from './auth/auth.reducers';
// import * as library from './library/library.reducers';
// import * as fromRouter from '@ngrx/router-store';
// import * as message from './message/message.reducers';
import * as rosta from './rosta/rosta.reducers';


export interface AppState {
  auth: auth.AuthState;
  //   message: message.MessageState;
  //   library: library.LibraryState;
    rosta: rosta.RostaState;
  //   router: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: auth.authReducer,
  //   message: message.messageReducer,
  //   library: library.libraryReducer,
  rosta: rosta.rostaReducer,
  //   router: fromRouter.routerReducer,
};
