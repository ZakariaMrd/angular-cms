import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/';
  private token = null;
  tokenKey = 'token';
  constructor(private httpClient: HttpClient) {}
  register(credentials: any) {
    const fullUrl = `${this.baseUrl}users/register`;
    this.httpClient.post<any>(fullUrl, credentials).subscribe((createdUser) => {
      console.log(createdUser);
    });
  }
  login(credentials: any) {
    const fullUrl = `${this.baseUrl}auth/login`;
    this.httpClient
      .post<any>(fullUrl, credentials)
      .subscribe((serverObject) => {
        this.token = serverObject.access_token;
        console.log('serverObject', serverObject);
        localStorage.setItem(this.tokenKey, serverObject.access_token);
      });
  }
  decodePayloadToken(token: string) {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }
  get isAdmin() {
    if (!this.token) {
      return false;
    }
    const payload = this.decodePayloadToken(this.token);
    if(payload.role === 'admin') {
      return true;
    }else{
      return false;
    }
  }
}
