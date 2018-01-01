import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (sessionStorage.getItem('username')) {
        return true;
    }

    this.router.navigate(['/login'], { replaceUrl: true });
    return false;
  }
}
