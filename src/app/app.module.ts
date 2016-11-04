import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';

export const firebaseConfig = {
  apiKey: "AIzaSyDc8aMpqXQguHAOUg3lMCKYlxKoVxFNlSw",
  authDomain: "bookmark-24e12.firebaseapp.com",
  databaseURL: "https://bookmark-24e12.firebaseio.com",
  storageBucket: "bookmark-24e12.appspot.com"
};


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
