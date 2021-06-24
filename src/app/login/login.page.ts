import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {LoadingController, AlertController} from '@ionic/angular';

import {AuthService} from 'src/services/AuthService/auth.service';

import {LoginInfo} from 'src/models/LoginInfo';
import {SignupInfo} from 'src/models/SignupInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLogin = true;

  loginData: LoginInfo;
  registerData: SignupInfo;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.loginData = {email: '', password: ''};
    this.registerData = {
      name: '',
      userName: '',
      email: '',
      password: '',
      password2: '',
    };
  }

  ngOnInit() {}

  toggleLogin() {
    this.isLogin = !this.isLogin;
  }

  signIn(): void {
    if (!this.validateLogin(this.loginData)) {
      return;
    }

    this.presentLoading('Logging in...').then(() => {
      this.authService
        .signIn(this.loginData)
        .then((x) => {
          this.loadingCtrl.dismiss();
          this.goToTabs();
        })
        .catch((error) => {
          this.loadingCtrl.dismiss();

          console.log(error);
          this.presentAlert('Log In Error', error.message);
        });
    });
  }

  validateLogin(loginInfo: LoginInfo): boolean {
    if (loginInfo.email.trim() === '') {
      this.presentAlert('Log In warning', 'Please provide an email address.');
      return false;
    }

    if (loginInfo.password.trim() === '') {
      this.presentAlert('Log In warning', 'Please provide a password.');
      return false;
    }

    return true;
  }

  signUp(): void {
    if (!this.validateSignup(this.registerData)) {
      return;
    }

    this.presentLoading('Signing up...').then(() => {
      this.authService
        .registerUser(this.registerData)
        .then((x) => {
          this.loadingCtrl.dismiss();
          this.goToTabs();
        })
        .catch((error) => {
          this.loadingCtrl.dismiss();

          console.log(error);
          this.presentAlert('Sign Up Error', error.message);
        });
    });
  }

  validateSignup(signupInfo: SignupInfo): boolean {
    if (signupInfo.name.trim() === '') {
      this.presentAlert('Sign Up warning', 'Please provide a name.');
      return false;
    }

    if (signupInfo.userName.trim() === '') {
      this.presentAlert('Sign Up warning', 'Please provide a username.');
      return false;
    }

    if (signupInfo.email.trim() === '') {
      this.presentAlert('Sign Up warning', 'Please provide an email address.');
      return false;
    }

    if (signupInfo.password.trim() === '') {
      this.presentAlert('Sign Up warning', 'Please provide a password.');
      return false;
    }

    if (signupInfo.password2.trim() === '') {
      this.presentAlert('Sign Up warning', 'Please confirm your password.');
      return false;
    }

    if (signupInfo.password.trim() !== signupInfo.password2.trim()) {
      this.presentAlert('Sign Up warning', 'The passwords do not match.');
      return false;
    }

    return true;
  }

  async presentLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message: message,
      spinner: 'bubbles',
    });

    await loading.present();
  }

  async presentAlert(header: string, errorMessage: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: errorMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }

  goToTabs() {
    this.router.navigateByUrl('tabs/home');
  }
}
