import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseAuth, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthService {
  private _observable: Observable<boolean>;

  constructor(public af: AngularFire) {
    this._observable.lift = Observable.create(observer => {
      this.af.auth.subscribe(auth => {
        console.log(auth);
        observer.next(auth !== null);
      })
      observer.complete();
    });
  }

  get auth() {
    return this._observable;
  }

}
