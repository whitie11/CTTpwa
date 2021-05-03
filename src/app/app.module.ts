import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogInComponent } from './rootPages/login/login.component';
import { HomeComponent } from './rootPages/home/home.component';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers } from './_store/app.states';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './_store/auth/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthService } from './_services/auth.service';
import { AuthGuardService } from './_helpers/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { MaterialsModule } from './_materials/materials.module';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    HomeComponent
  ],
  imports: [
    MaterialsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forRoot( reducers, { }),
    EffectsModule.forRoot([AuthEffects,
      // MessageEffects, LibraryEffects, RostaEffects
      ]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),



  ],
  providers: [
    AuthService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
