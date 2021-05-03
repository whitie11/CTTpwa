import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { LoginDTO } from 'src/app/models/loginDTO';
import { AppState } from 'src/app/_store/app.states';
import { validateWhitespace } from '../../_helpers/validators';
import * as AuthActions from '../../_store/auth/auth.actions';
import { getIsAuth, getIsWaiting } from 'src/app/_store/auth/auth.selectors';
@Component({
  selector: 'ctt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogInComponent implements OnInit {

  formdata: FormGroup;
  waiting$: Observable<boolean>;
  // user: AuthDTO = new AuthDTO();
 // getState: Observable<any>;
  errorMessage: string | null | undefined;
  isAuth$: Observable<boolean>;

  constructor(private fb: FormBuilder,  private store: Store<AppState>) {
    this.waiting$ = of(true);
    this.isAuth$ = of(false);
    this.formdata = this.fb.group({
    username: this.fb.control('ian.white', [Validators.required, validateWhitespace]),
    password: this.fb.control('C@sper12', [Validators.required, validateWhitespace])
  });
   }
  ngOnInit(): void {
    this.waiting$ = this.store
    .pipe(
      select(getIsWaiting)
    );
    this.isAuth$ = this.store
    .pipe(
      select(getIsAuth)
    );
  }

  onSubmit(): void {
    const data = this.formdata.getRawValue() as LoginDTO;

    const x =  this.store.dispatch(AuthActions.LogIn({ payload: data}));
  }

  onLogOut(): void {
    this.store.dispatch(AuthActions.LogOut());
  }

}
