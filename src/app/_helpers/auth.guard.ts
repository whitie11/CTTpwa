import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import * as fromStore from '../_store/app.states';
import * as fromSelectors from '../_store/auth/auth.selectors';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';



const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthGuardService implements CanActivate {

    // getState: Observable<any>;
    isAuth = false;
    token: string | null = '';
    // lo: boolean;
    constructor(
        public router: Router,
        private store: Store<fromStore.AppState>,
        private snackBar: MatSnackBar
    ) { }

    canActivate(): boolean {

        // get observable
        const isAuth$ = this.store.select(fromSelectors.getIsAuth);
        // redirect to sign in page if user is not authenticated
        isAuth$.subscribe(auth => {
            this.isAuth = auth;

        });
        const token$ = this.store.select(fromSelectors.getToken);
        token$.subscribe(res => {
            this.token = res;
        });

        if (!this.isAuth) {
            // this.store.dispatch(new SetErrorMessage('You are not authenticated to view page'));
            console.log('You do not have permission, please login');
            this.snackBar.open('You do not have permission, please login', 'Close', {
                duration: 3000,
                verticalPosition: 'top'
            });
           // this.router.navigateByUrl('/login/');
            this.router.navigate(['/login/']);
            return false;
        }

        else if (this.token == null || this.token.length <= 0 || jwtHelper.isTokenExpired(this.token)) {
            //   this.store.dispatch(new SetErrorMessage('There is no token present'));
            this.snackBar.open('Please login to renew token', 'Close', {
                duration: 3000,
                verticalPosition: 'top'
            });
            this.router.navigateByUrl('/login/');
            return false;
        }
        return true;
    }
}
