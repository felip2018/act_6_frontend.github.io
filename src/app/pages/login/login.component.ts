import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  @Output() successLogin: EventEmitter<any>

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
    this.successLogin = new EventEmitter();

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginForm.valueChanges.subscribe(data=>console.log(data));
  }

  async submit() {
    try {
      const {username, password} = this.loginForm.value;
      const loginResponse: any = await lastValueFrom(this.authenticationService.login(username, password))
      console.log('LOGIN RESPONSE > ', loginResponse);
      if (loginResponse.statusCode === 200) {
        // Se ha iniciado sesión correctamente
        sessionStorage.setItem('isLogin', 'true');
        sessionStorage.setItem('userData', JSON.stringify(loginResponse.user || {}));
        this.successLogin.emit(loginResponse.user);
      } else {
        // Datos incorrectos
        Swal.fire(
          'Aviso',
          'No ha sido posible iniciar sesión, por favor verifique su usuario y/o clave.',
          'error'
        );
      }

    } catch (err) {
      console.error(err);
    }
  }
}
