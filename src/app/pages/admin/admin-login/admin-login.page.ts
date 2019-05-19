import { Router } from '@angular/router';
import { AdminService } from './../../../service/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
})
export class AdminLoginPage implements OnInit {

  loginform: FormGroup;
  error;
// tslint:disable-next-line: variable-name
  error_messages = {
    user_name: [
      { type: 'required', message: 'user_name is required' },
      { type: 'maxLength', message: 'username lenght must be lower than or equal to 50 characters'}
    ],
    password: [
      { type: 'required', message: 'Password is required'},
      { type: 'minLength', message: 'Password Length must be longer or equal to 6 characters'},
      { type: 'maxLength', message: 'Password length must be lower or equal to 50 characters'}
    ]
  };
  constructor(
    public admin: AdminService,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public forgotCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public router: Router
  ) { }

  ngOnInit() {
    this.form();
  }

  form() {
    this.loginform = this.formBuilder.group({
      user_name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ])]
    });
  }

  async login() {
    const loader = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'bubbles'
    });
    loader.present();
    const payload = JSON.stringify(this.loginform.value);
    // console.log(payload);
    this.admin.login(payload).then((res) => {
      // console.log(res);
      this.loginform.reset();
      loader.dismiss().then(() => {
        this.router.navigateByUrl('menu/dash');
      });
    }).catch(async (err) => {
      this.loginform.reset();
      this.error = err;
      // console.log(this.error.error.message);
      loader.dismiss();
      if (this.error.error.message) {
        const toast = await this.toastCtrl.create({
          message: this.error.error.message,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    });
  }

  async forgotPass() {
    const forgot = await this.forgotCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: async data => {
            const loader = await this.loadingCtrl.create({
              showBackdrop: true,
              spinner: 'bubbles'
            });
            loader.present();
            // console.log('Send clicked', data);
            this.admin.passwordReset(data).then((val) => {
              // console.log(val);
              loader.dismiss().then(async () => {
                const toast = await this.toastCtrl.create({
                  message: 'success, pls check your mail',
                  duration: 3000,
                  position: 'top',
                  cssClass: 'dark-trans',
                  closeButtonText: 'OK',
                  showCloseButton: true
                });
                toast.present();
              });
            }).catch((e) => {
              loader.dismiss();
              // console.log(e);
            });
          }
        }
      ]
    });
    forgot.present();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Invalid Username or Password',
      position: 'top',
      duration: 3000
    });
    toast.present();
  }

  signUp() {
    this.loginform.reset();
    this.router.navigateByUrl('/admin-reg');
  }

  voter() {
    this.loginform.reset();
    this.router.navigateByUrl('/login');
  }
}
