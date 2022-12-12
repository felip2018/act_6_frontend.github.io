import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      documenttype: ['', Validators.required],
      document: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  async submit() {
    try {
      const userInfo = this.signupForm.value;
      const loginResponse: any = await lastValueFrom(this.authenticationService.signup(userInfo))
      console.log('SIGNUP RESPONSE > ', loginResponse);
      if (loginResponse.statusCode === 200) {
        Swal.fire(
          'Aviso',
          'Se ha realizado el registro de forma exitosa',
          'success'
        );
      } else {
        Swal.fire(
          'Aviso',
          'No ha sido posible realizar el registro.',
          'error'
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

}
