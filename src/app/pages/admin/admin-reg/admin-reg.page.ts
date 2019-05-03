import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from './../../../service/admin/admin.service';

@Component({
  selector: 'app-admin-reg',
  templateUrl: './admin-reg.page.html',
  styleUrls: ['./admin-reg.page.scss'],
})
export class AdminRegPage implements OnInit {

  regform: FormGroup;
  error;
  error_messages = {
    'full_name': [
      { type: 'required', message: 'Full name is required' }
    ],
    'code': [
      // tslint:disable-next-line:quotemark
      { type: 'required', message: "Admin's code is required" },
      { type: 'minLength', message: 'Password Length must be longer or equal to 6 characters' }
    ],
    'email': [
      { type: 'required', message: 'email is required' },
      { type: 'email', message: 'invalid email' }
    ],
    'user_name': [
      { type: 'required', message: 'user_name is required' },
      { type: 'maxLength', message: 'username lenght must be lower than or equal to 50 characters' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', message: 'Password Length must be longer or equal to 6 characters' },
      { type: 'maxLength', message: 'Password length must be lower or equal to 50 characters' }
    ]
  };
  constructor(
    public router: Router,
    public admin: AdminService,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.form();
  }

  form() {
    this.regform = this.formBuilder.group({
      full_name: ['', Validators.required],
      code: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      user_name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ])]
    });
  }

  async signUp() {
    const loader = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'bubbles'
    });
    loader.present();
    const payload = JSON.stringify(this.regform.value);
    console.log(payload);
    this.regform.reset();
    this.admin.signup(payload).then((res) => {
      console.log(res);
      loader.dismiss().then(() => {
        this.router.navigateByUrl('admin-login');
      });
    }).catch(async (err) => {
      this.regform.reset();
      console.log(err);
      loader.dismiss();
      if (this.error.error.message) {
        const toast = await this.toastCtrl.create({
          message: 'SignUp succesfull',
          duration: 2000
        });
        toast.present();
      }
    });
  }

  back() {
    this.router.navigateByUrl('/admin-login');
  }
}
