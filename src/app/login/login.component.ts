import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => console.log(auth));
  }

  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }

  loginGithub() {
    this.af.auth.login({
      provider: AuthProviders.Github,
      method: AuthMethods.Popup,
    });    
  }

  logout() {
    this.af.auth.logout();
  }
}
