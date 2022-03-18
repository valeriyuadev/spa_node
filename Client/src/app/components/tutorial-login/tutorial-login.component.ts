import { Component, OnInit } from '@angular/core';

import { TutorialLoginService, UserLoginInterface,  } from "../../services/tutorial-login.service";
import {TutorialErrorsService} from "../../services/tutorial-errors.service";

class LoginError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "LoginError";
  }
}

@Component({
  selector: 'app-tutorial-login',
  templateUrl: './tutorial-login.component.html',
  styleUrls: ['./tutorial-login.component.css']
})
export class TutorialLoginComponent implements OnInit {
  isLogined: boolean = false;

  userLogin: string    = '';
  userPassword: string = '';
  userName: string     = '';
  userToken: string    = '';

  constructor(
    private tutorialLoginService: TutorialLoginService,
    private tutorialErrorsService: TutorialErrorsService
  ) { }

  ngOnInit(): void {
    this.lateLogin();
  }

  lateLogin() {
    let data: any;

    data = this.tutorialLoginService.lateLogin();

    this.isLogined = data['isLogined'] ?? false;
    this.userName  = data['userName'] ?? '';
    this.userToken = data['userToken'] ?? '';
  }

  login() {
    let data: UserLoginInterface = {
      userLogin: this.userLogin,
      userPassword: this.userPassword
    };

    this.tutorialLoginService.login(data)
      .subscribe({
        next: (res) => {
          console.table(res);

          let userTokem = res['userTokem'] || false;

          if(! userTokem){
            throw new LoginError('Fialed login')
          }

          this.tutorialLoginService.saveLoginData(res);

          this.isLogined = true;
          this.userName  = res.userName;
          this.userToken = userTokem;
        },
        error: (e) => {
          let errorMessag = [];

          console.error('Error', e);

          if(e instanceof LoginError) {
            errorMessag.push(e.message);
          }
          else {
            errorMessag = e.error.message
          }

          this.tutorialErrorsService.showErrors(errorMessag);
        }
      });
  }

  logout() {
    this.isLogined = false;
    this.userName  = '';
    this.userToken = '';

    this.tutorialLoginService.logout();
  }
}
