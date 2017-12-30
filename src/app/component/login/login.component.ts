import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {LoginService} from './login.service';
import { NewUser } from '../registration/registration';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  rForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.rForm = fb.group({
      'username': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  
   }

  ngOnInit() {
  }
  submitForm(formValue) {
    console.log('called', formValue);
    this.loginService.signIn(formValue).then((newUser: NewUser) => {
      console.log('successfully addded ' + newUser);
      // this.router.navigate(['']);
    }).catch(this.handleError);
  }
  private handleError (error: any) {
    console.error(error); // log to console instead
  }
}
