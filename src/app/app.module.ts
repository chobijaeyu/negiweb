import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import localeJa from '@angular/common/locales/ja';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { defaultDataServiceConfig, entityConfig } from './entity-metadata';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { httpInterceptorProviders } from './services/auth.interceptor';

registerLocaleData(localeJa)

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    httpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'ja-JP' },
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
