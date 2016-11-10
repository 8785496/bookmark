import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import 'rxjs/add/operator/map';
import { CanActivate } from '@angular/router';
import { AngularFire, FirebaseAuth, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthGuard implements CanActivate {
  private authState: FirebaseAuthState;
  public authObservable: Observable<boolean>;

  constructor(public af: AngularFire) {

    this.authObservable = Observable.create(observer => {

      if (this.authState === undefined) {
        af.auth.subscribe(auth => {
          this.authState = auth
          observer.next(this.authState !== null);
        })
      } else {
        observer.next(this.authState !== null);
      }

      observer.complete();
    });
  }

  canActivate() {
    return this.authObservable;
  }
}