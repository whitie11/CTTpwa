import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_store/app.states';
import * as AuthActions from '../../_store/auth/auth.actions';


@Component({
  selector: 'ctt-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {


constructor(private store: Store<AppState>) {}


  ngOnInit(): void {
  }

  onLogOut(): void {
    this.store.dispatch(AuthActions.LogOut());
  }

}
