import { Injectable } from '@angular/core';
import { NewUser } from './registration';
import { Http, Response, Headers} from '@angular/http';
import * as rxjs from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegistrationService {

  private postUri = '/api/newUser';
  
  constructor(private http: Http) { }
  
  registerUser(newUser: NewUser): Promise<NewUser> {
        return this.http.post(this.postUri, newUser)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }
  
  private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error data';
      console.error(errMsg); // log to console instead
  }

}
