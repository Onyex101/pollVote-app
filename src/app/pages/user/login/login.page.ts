import { ShareDataService } from './../../../service/share/share-data.service';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { VoterService } from './../../../service/voter/voter.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginform: FormGroup;
  error_messages = {
    'user_name': [
      { type: 'required', message: 'user_name is required' },
      { type: 'maxLength', message: 'username lenght must be lower than or equal to 50 characters' }
    ],
    'code': [
      { type: 'required', message: 'Admin code is required' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', message: 'Password Length must be longer or equal to 6 characters' },
      { type: 'maxLength', message: 'Password length must be lower or equal to 50 characters' }
    ]
  };

  constructor(
    private router: Router,
    private voter: VoterService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public forgotCtrl: AlertController,
    private shareData: ShareDataService
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
      code: [''],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ])]
    });
  }

   login() {
    const payload = JSON.stringify(this.loginform.value);
    console.log(payload);
    const code = this.loginform.value.code;
    console.log('code', code);
    this.voter.login(payload).then(async(res) => {
      this.shareData.setCode(code);
      this.loginform.reset();
      console.log(res);
      const toast = await this.toastCtrl.create({
        message: 'Login Successfull!',
        duration: 2000,
        position: 'bottom'
      });
      toast.present().then(() => {
        this.router.navigateByUrl('/voter');
      });
    }).catch((e) => {
      console.log(e);
      this.presentToast();
    });
  }

  signUp() {
    this.loginform.reset();
    this.router.navigateByUrl('/reg');
  }

  admin() {
    this.loginform.reset();
    this.router.navigateByUrl('/admin-login');
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
          handler: data => {
            // console.log('Cancel clicked', data);
          }
        },
        {
          text: 'Send',
          handler: async data => {
            console.log('Send clicked', data);
            const loader = await this.loadingCtrl.create({
              showBackdrop: true,
              spinner: 'bubbles'
            });
            loader.present();
            this.voter.resetPass(data).then(async () => {
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
              console.log(e);
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
}
