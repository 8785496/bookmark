import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { BookComponent } from './book/book.component';
import { BookAddComponent } from './book-add/book-add.component';
import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'book/:id', component: BookComponent, canActivate: [AuthGuard] },
  { path: 'bookadd', component: BookAddComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];

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
    FormComponent,
    ListComponent,
    BookComponent,
    BookAddComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
