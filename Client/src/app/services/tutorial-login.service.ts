import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tutorial } from '../models/tutorial.model';
import { ThrowStmt } from '@angular/compiler';

import { apiUrl } from '../../assets/config';

interface UserLoginInterface { userLogin: string, userPassword: string };

@Injectable({
  providedIn: 'root'
})
class TutorialLoginService {
  userTokenFileds = [ 'userName', 'usertoken' ];
  userLogined     = false;
  loginData = {
    isLogined: false,
    userName:  '',
    userToken: '',
  };
  localStorage = window.localStorage;

  constructor( private http: HttpClient ) { }

  logout() {
    this.removeCookie('userTokem');
    this.removeCookie('userName');

    this.userLogined = false;
  }

  login(data: UserLoginInterface): Observable< any > {
    let res = this.http.post( `${apiUrl}/login/`, data );

    return res;
  }

  isUserLogined(): boolean {
    this.lateLogin();

    console.log('is user logined - ',  this.userLogined);

    return this.userLogined;
  }

  lateLogin(): Object {
    let userToken = this.getCookie('userTokem');
    let userName  = this.getCookie('userName');
    let isLogined = Boolean(userToken && userName);

    this.userLogined = isLogined;

    let data = {
      userToken,
      userName,
      isLogined
    };

    return data;
  }

  saveLoginData(data: any) {
    for(let cname in data) {
      this.setCookie(cname, data[cname], 10);
    }
  }

  getUserToken() {
    return this.getCookie('userTokem') as string;
  }

  private setCookie(cname: string, cvalue: string, exminutes: number = 0) {
    this.localStorage.setItem(cname, cvalue);
  }

  private getCookie(cname: string) {
    return this.localStorage.getItem(cname);
  }

  private removeCookie(cname: string) {
    this.localStorage.removeItem(cname);
  }

  // /**
  //  * @param cname
  //  * @param cvalue
  //  * @param exminutes
  //  * @private
  //  */
  // private setCookie(cname: string, cvalue: string, exminutes: number = 0) {
  //   const d = new Date();
  //   const timeOffset = exminutes < 0 ;
  //   d.setTime(d.getTime() + (exminutes*60*1000));
  //   let expires = "expires="+ d.toUTCString();
  //   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  // }
  //
  // private getCookie(cname: string) {
  //   let name = cname + "=";
  //   let decodedCookie = decodeURIComponent(document.cookie);
  //   let ca = decodedCookie.split(';');
  //   for(let i = 0; i <ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) == ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) == 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
  // }
}

export {
  TutorialLoginService,
  UserLoginInterface
}
