/*
Auth service:
Basically anything having to do with the jwt is in here which includes:
  Logging in
  Getting authorization
  Logging out
  Setting timers
  Validating token with the backend
*/




import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private isAuthenticated = false;
  private token: string;

  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  private validity: { validity: boolean };
  private validityUpdated = new Subject<{validity: boolean }>();

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {

  }

  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  login(token) {
    const jwtToken = token;
    this.token = jwtToken;
    if (jwtToken) {
      const expiresInDuration = jwtToken.expiresIn;
      this.setAuthTimer(expiresInDuration);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      this.saveAuthData(jwtToken.token, expirationDate);
    }
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();

    this.router.navigate(['/login']);
  }
  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    this.cookieService.deleteAll( '/ ',  '/' );     // Destroys the jwt cookie so that it is not accidentally left and can be re logged in from someone else
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }

  validateToken(token: string) {

    this.http.get<{validity: boolean}>(environment.getApiUrl('discord/isVerified'), {params: {token}}).subscribe((validity) => {    // Checks the jwt validity by having backend decode it.
      console.log(validity);                                                                                                                                                // I'm gonna be honest with you, I dont know why validity is type {validity: boolean} but I couldn't
      this.validity =  validity;                                                                                                                                            // get it to work as a regular boolean so here we are
      this.validityUpdated.next(this.validity);
    });
  }
  public getValidityUpdated() {
    return this.validityUpdated.asObservable();
  }



}
