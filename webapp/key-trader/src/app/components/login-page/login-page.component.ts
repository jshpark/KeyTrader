import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent  {

  constructor(public authService: AuthService) { }


}
