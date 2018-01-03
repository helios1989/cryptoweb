import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService:  AuthenticationService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //   if (sessionStorage.getItem('username')) {
    //     return true;
    // }
    if (this.authenticationService.authenticateUser()) {
      console.log('is true');
      return true;
    } else {
      console.log('is false');
      this.router.navigate(['/login'], { replaceUrl: true });
      return false;
    }
  }
}
