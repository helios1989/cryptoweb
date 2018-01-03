import { Injectable } from '@angular/core';
import { Ico} from './ico.model';
import { Router } from '@angular/router';
import { Http, Response, Headers} from '@angular/http';
import * as rxjs from 'rxjs';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class IcoService {
  
  private ICOuri = '/api/incomingICO';
  
  constructor(private http: Http) { }

  getICOs() {
      return this.http.get(this.ICOuri)
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
