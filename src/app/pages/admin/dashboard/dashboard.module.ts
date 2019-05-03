import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ProgressBarModule } from 'angular-progress-bar';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../../../shared/shared.module';
import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  entryComponents: [],
  imports: [
    CommonModule,
    ProgressBarModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
