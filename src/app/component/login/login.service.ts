import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import * as rxjs from 'rxjs';
import 'rxjs/add/operator/toPromise';
//borrow registration
import {NewUser} from '../registration/registration'

@Injectable()
export class LoginService {
  private putUri = '/api/signin';
  constructor(
    private http: Http
  ) { }

  signIn(newUser: NewUser): Promise<NewUser> {
    return this.http.post(this.putUri, newUser)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }
  private handleError (error: any) {
    console.log('this is error', error);
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error data';
    console.error(error); // log to console instead
  }
}
