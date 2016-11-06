import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private _collapse: boolean = true;

  constructor(public af: AngularFire, private router: Router) { }

  ngOnInit() {
    this.af.auth.subscribe(auth => console.log(auth));
  }

  toggleCollapse() {
    this._collapse = !this._collapse;
  }

  get collapse() {
    return this._collapse;
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
    this.af.auth.subscribe(auth => {
      if (auth === null) {
        console.log('logout', auth);
        this.router.navigate(['/list']);
        // TODO
      }
    });
  }

}
