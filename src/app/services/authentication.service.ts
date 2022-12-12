import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {
    const body = {
      username,
      password
    }
    return this.http.post(`${environment.basePath}/authentication/login`, body)
  }
}
