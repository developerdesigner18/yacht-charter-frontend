import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private BASE_URI: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.BASE_URI = environment.apiUrl;
  }

  adminLogin(payload: {
    username: string;
    password: string;
  }): Observable<any> {
    return this.httpClient.post(`${this.BASE_URI}/auth/signin`, payload);
  }
}
