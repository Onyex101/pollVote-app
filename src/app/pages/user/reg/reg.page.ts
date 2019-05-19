import { Router } from '@angular/router';
import { VoterService } from './../../../service/voter/voter.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.page.html',
  styleUrls: ['./reg.page.scss'],
})
export class RegPage implements OnInit {
  loginform: FormGroup;
// tslint:disable-next-line: variable-name
  error_messages = {
    full_name: [
      { type: 'required', message: 'Full name is required'}
    ],
    email: [
      { type: 'required', message: 'email is required'},
      { type: 'email', message: 'invalid email'}
    ],
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
    private router: Router,
    private formBuilder: FormBuilder,
    private voter: VoterService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.form();
  }

  form() {
    this.loginform = this.formBuilder.group({
      full_name: ['', Validators.required],
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

  signUp() {
    const payload = JSON.stringify(this.loginform.value);
    // console.log(payload);
    this.voter.signup(payload).then(async () => {
      // console.log(res);
      const toast = await this.toastCtrl.create({
        message: 'Account successfully created!',
        duration: 2000,
        position: 'bottom'
      });
      toast.present().then(() => {
        this.router.navigateByUrl('/login');
      });
    }).catch((err) => {
      // console.log(err);
    });
  }

  back() {
    this.router.navigateByUrl('/login');
  }
}
