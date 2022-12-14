import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { LoginComponent } from './pages/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  userName: string = '';
  enableButtons = false;
  loginSubscription: Subscription | any = null;

  constructor(private router: Router){}

  ngOnInit() {
    const isLogin = sessionStorage.getItem('isLogin');
    if (isLogin && isLogin === 'true') {
      const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
      this.userName = `Bienvenido <strong>${userData.name}</strong>`;
    }
  }

  subscribeToEmmiter(componentRef: any) {
    if (componentRef instanceof LoginComponent){
      console.log(componentRef);
      this.loginSubscription = componentRef.successLogin.subscribe((ev) => {
        console.log("Parent get event:: ", ev);
        this.userName = `Bienvenido <strong>${ev.name}</strong>`;
      })
    }
  }

  unsubscribe() {
    console.log(this.loginSubscription);
    if (this.loginSubscription !== null) {
      this.loginSubscription.unsubscribe();
    }
  }

  public closeSession() {
    const isLogin = sessionStorage.getItem('isLogin');
    if (isLogin && isLogin === 'true') {
      Swal.fire({
        title: '¿Esta seguro de cerrar la sesión?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Si, cerrar sesión',
        denyButtonText: `No, cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          sessionStorage.clear();
          this.userName = '';
          Swal.fire('Sesión finalizada', '¡La sesión ha sido finalizada exitosamente!', 'success');
          this.router.navigate(['/login']);
        }
      })
    } else {
      Swal.fire(
        'Aviso',
        'No hay sesión activa para cerrar',
        'info'
      )
    }
  }
}
