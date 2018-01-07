import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication/authentication.service';
import { Http, Response, Headers} from '@angular/http';
@Injectable()
export class AuthenticationGuard implements CanActivate {
  header = new Headers({'Content-Type': 'application/json', 'Authorization': 
  'Bearer '+ sessionStorage.getItem('token')});
  constructor(
    private router: Router,
    private http: Http
    // private authenticationService:  AuthenticationService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //   if (sessionStorage.getItem('username')) {
    //     return true;
    // }
    // if (this.authenticationService.authenticateUser()) {
    //   console.log('is true');
    //   return true;
    // } else {
    //   console.log('is false');
    //   this.router.navigate(['/login'], { replaceUrl: true });
    //   return false;
    // }
    // this.authenticationService.authenticateUser().then(data => {
    //   console.log(data);
    // })
    // return false;
    const url = '/api/verifyUser';
    const username = { 'username': sessionStorage.getItem('username')};
    let retValue = false;
    return this.http.post(url, username, {headers: this.header})
    .toPromise()
    .then(response => {
      if (response.status  === 200) {
        return true;
      } else {
        this.router.navigate(['/login'], { replaceUrl: true });
        return false;
      }
    });
  }
}
