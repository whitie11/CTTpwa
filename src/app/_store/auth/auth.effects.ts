import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { AuthService } from '../../_services/auth.service';
import * as AuthActions from './auth.actions';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()

export class AuthEffects {

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  GetLogin$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.LogIn),
      mergeMap((action) =>
        this.authService.logIn(action.payload.username, action.payload.password)
          .pipe(map((data: any) => {
         //   console.log('Username = ' + action.payload.username);
            return AuthActions.LogInSuccess({ payload: data, userName: action.payload.username });
          }),
            catchError((error: any) => {
              return of(AuthActions.LogInFailure({ payload: error.statusText }));
            })
          )
      )
    )
  );

  LogInFailure$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.LogInFailure),
      tap((err) => {
        this.snackBar.open('Login failed: ' + err.payload, 'Close', {
          duration: 3000,
          verticalPosition: 'top'
      });
      })
    ),
    { dispatch: false }
    );

    LogInSuccess$: Observable<any> = createEffect(() =>
      this.action$.pipe(
        ofType(AuthActions.LogInSuccess),
        tap((err: any) => {
      //    console.log('In 5uccess Effect = ' + err);
          this.router.navigate(['/home']);
        })
      ),
      { dispatch: false }
      );

      LogOut$: Observable<any> = createEffect(() =>
      this.action$.pipe(
        ofType(AuthActions.LogOut),
        tap((action: any) => {
          this.router.navigate(['/']);
        })
      ),
      { dispatch: false }
      );

}
