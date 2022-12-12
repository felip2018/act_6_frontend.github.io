import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate() {
    const isLogin = sessionStorage.getItem('isLogin');
    if (isLogin && isLogin === 'true'){
      return true;
    }
    Swal.fire(
      'Aviso',
      '¡Debe iniciar sesión para acceder a este recurso!',
      'warning'
    )
    return false;
  }

}
