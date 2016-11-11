import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import 'rxjs/add/operator/map';
import { CanActivate } from '@angular/router';
import { AngularFire, FirebaseAuth, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthGuard implements CanActivate {
  private authState: FirebaseAuthState;
  public authObservable: Observable<boolean>;

  constructor(public af: AngularFire, private router: Router) {

    this.authObservable = Observable.create(observer => {
      let a = this.authState;
      
      if (this.authState === undefined) {
        af.auth.subscribe(auth => {
          this.authState = auth;
          a = auth;
          if (auth === null) {
            this.router.navigate(['/login']);
          }
          observer.next(this.authState !== null);
        })
      } else {
        observer.next(this.authState !== null);
      }

      observer.complete();

      return () => {
        if (a === null) {
          this.router.navigate(['/login']);
        }
      };
    });
  }

  canActivate() {
    return this.authObservable;
  }
}