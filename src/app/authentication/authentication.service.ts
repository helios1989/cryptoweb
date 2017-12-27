import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Observer } from 'rxjs/Observer';


export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
  type: string;
  user_id: string;
}


export interface LoginContext {
  username: string;
  password: string;
}

const credentialsKey = 'credentials';
/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  constructor() { }

}
