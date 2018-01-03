import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Observer } from 'rxjs/Observer';
import { Router } from '@angular/router';
import { Http, Response, Headers} from '@angular/http';
import * as rxjs from 'rxjs';
import 'rxjs/add/operator/toPromise';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  header = new Headers({'Content-Type': 'application/json', 'Authorization': 
    'Bearer '+ sessionStorage.getItem('token')});
  constructor(private http: Http) { }

  authenticateUser(): boolean {
    const url = '/api/verifyUser';
    const username = { 'username': sessionStorage.getItem('username')};
    let retValue = false;
    this.http.post(url, username, {headers: this.header}).subscribe(res => {
       
      if (res.status === 200) {
        console.log('is ok');
        retValue =  true;
      } else {
        retValue =  false;
      }
    });
    return retValue;
    // return false;
  }

}
