import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import 'rxjs/add/operator/map';
import { CanActivate } from '@angular/router';
import { AngularFire, FirebaseAuth, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthGuard implements CanActivate {
  private authState: FirebaseAuthState;
  public _observable: Observable<boolean>;

  constructor(public af: AngularFire) {
    console.log('AuthGuard constructor', this.af.auth);

    //return this.af.auth.map(auth => true)
    // this._observable = Observable.create(observer => {
    //   this.af.auth.lift
      
    //   subscribe(auth => {
    //     console.log('AuthGuard', auth);
    //     observer.next(auth !== null);
    //   })
    //   //observer.complete();
    // });
    // //op: Operator<AngularFireAuth, boolean>

    // //this._observable = this.af.auth.lift(op);

  }

  canActivate() {
    console.log('AuthGuard#canActivate called');
    //return this.checkLogin();
    //return this._observable;
    this._observable = this.af.auth.map(auth => true);
    Observable.create()
    console.log(this._observable);
    return this._observable;
  }

  // checkLogin(): Observable<boolean> {
  //   return Observable.create(observer => {
  //     this.af.auth.subscribe(auth => {
  //       console.log(auth);
  //       observer.next(auth !== null);
  //     })
  //     observer.complete();
  //   });
  // }
}