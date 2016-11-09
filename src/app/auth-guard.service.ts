import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CanActivate } from '@angular/router';
import { AngularFire, FirebaseAuth, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthGuard implements CanActivate {
  private authState: FirebaseAuthState;

  constructor(private af: AngularFire) {
    // af.auth.forEach(auth => auth !== null);
    
    // this.authState = auth.getAuth();
    // auth.subscribe((state: FirebaseAuthState) => {
    //   this.authState = state;
    // });
    
  }

  canActivate() {
    console.log('AuthGuard#canActivate called');
    //return this.checkLogin();
    // return this.af.auth.map(auth => {
    //   console.log(auth); 
    //   return true;
    //   // return Observable.create(observer => {
    //   //   observer.next(true);
    //   //   observer.complete();
    //   // });
    // });
    let temp: Observable<boolean> = this.af.auth.map(auth => {return null});
    console.log(temp);
    return temp;

  }

  checkLogin(): Observable<boolean> {
    // return Observable.create(observer => {
    //   observer.next(true);
    //   observer.complete();
    // });
    return this.af.auth.map(auth => {
      console.log(auth); 
      return true;
    });
  }

  // checkLogin(): boolean {
  //   // if (this.authService.isLoggedIn) { return true; }
  //   if (this.auth.getAuth !== null) { return true; }

  //   // // Store the attempted URL for redirecting
  //   // this.authService.redirectUrl = url;

  //   // // Create a dummy session id
  //   // let sessionId = 123456789;

  //   // // Set our navigation extras object
  //   // // that contains our global query params and fragment
  //   // let navigationExtras: NavigationExtras = {
  //   //     queryParams: { 'session_id': sessionId },
  //   //     fragment: 'anchor'
  //   // };

  //   // // Navigate to the login page with extras
  //   // this.router.navigate(['/login'], navigationExtras);

  //   return false;
  // }
}