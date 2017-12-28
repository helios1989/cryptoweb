import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { NewUser } from './registration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [RegistrationService]
})
export class RegistrationComponent implements OnInit {
  //SetValidation
  rForm: FormGroup;
  emailp = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)+(\.[a-z]{3,15})$';
  passp ='[a-z0-9]{7,20}';

  constructor(
    private fb: FormBuilder,
    private registerService: RegistrationService
  ) {
 
    this.rForm = fb.group({
      'username': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      'password': [null, Validators.compose([
        Validators.required, 
        Validators.pattern(this.passp)
      ])],
      'confirmPassword': [null, Validators.compose([
        Validators.required,
        Validators.pattern(this.passp)
      ])],
      'email' : [null, Validators.compose([
        Validators.required, 
        Validators.pattern(this.emailp)]) 
      ],
      'fullname': [null, Validators.compose([
        Validators.required
      ])],
    });
  
  }

  ngOnInit() {
  }
  submitForm(formValue): void {
      this.registerService.registerUser(formValue).then((newUser: NewUser) => {
        console.log('successfully addded ' + newUser);
        // this.router.navigate(['']);
    });
  }
}
