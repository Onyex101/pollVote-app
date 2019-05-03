import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AdminService } from './../../../service/admin/admin.service';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.page.html',
  styleUrls: ['./new-poll.page.scss'],
})
export class NewPollPage implements OnInit {

  showForm = true;
  public myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private admin: AdminService,
    private router: Router
  ) {
    this.form();
  }

  async ngOnInit() {
    const loader = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'bubbles'
    });
    loader.present();
    this.admin.currentRes().then((val) => {
      console.log(val);
      loader.dismiss().then(() => {
        this.showForm = false;
      });
    }).catch((e) => {
      console.log('error', e);
      loader.dismiss().then(() => {
        this.showForm = true;
      });
    });
  }

  form() {
    this.myForm = this.formBuilder.group({
      question: ['', Validators.required],
      duration: ['', Validators.required],
      options: this.formBuilder.array([
        this.initFields()
      ])
    });
  }

  initFields(): FormGroup {
    return this.formBuilder.group({
      field: ['', Validators.required]
    });
  }

  addNewInputField(): void {
    const control = <FormArray>this.myForm.controls.options;
    control.push(this.initFields());
  }

  removeInputField(i: number): void {
    const control = <FormArray>this.myForm.controls.options;
    control.removeAt(i);
  }

  async submit() {
    if (this.myForm.valid) {
      const loader = await this.loadingCtrl.create({
        showBackdrop: true,
        spinner: 'bubbles'
      });
      loader.present();
      console.log(this.myForm.value);
      const payload = JSON.stringify(this.myForm.value);
      console.log(payload);
      this.admin.createPPoll(payload).then((val) => {
        this.myForm.reset();
        console.log(val);
        loader.dismiss().then(() => {
          this.router.navigateByUrl('/menu');
        });
      }).catch((e) => {
        this.myForm.reset();
        loader.dismiss();
        console.log(e);
      });
    }
  }

  isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
}
