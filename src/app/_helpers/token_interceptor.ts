import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// import { AppState, getToken } from '../store/app.state';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/app.states';
import { getToken } from '../_store/auth/auth.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    // private authService: AuthService;
    // private authService: AuthService;
    // token$: Observable<string> | undefined;
    token!: string;

    constructor(private injector: Injector, private store: Store<AppState>) {
        const token$ = this.store.select(getToken);
        token$.subscribe(t => {
            if (t !== null) {
                this.token = t;
            }
            else { this.token = ''; }
        });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // this.authService = this.injector.get(AuthService);
        // const token: string = this.authService.getToken();
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.token}`,
            //    'Content-Type': 'application/json'
            },
            withCredentials: this.token.length > 1
        });
        return next.handle(request);
    }
}
