import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder) {
    
       this.rForm = fb.group({
         'username': [null, Validators.compose([
           Validators.required
         ])],
         'password': [null, Validators.compose([
           Validators.required
         ])]
       });
   }
  rForm: FormGroup;
  ngOnInit() {
  }

  submit(formValue) {
    console.log(formValue);
  }
}
