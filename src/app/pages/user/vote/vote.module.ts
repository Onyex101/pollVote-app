import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ProgressBarModule } from 'angular-progress-bar';
import { IonicModule } from '@ionic/angular';

import { VotePage } from './vote.page';

const routes: Routes = [
  {
    path: '',
    component: VotePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressBarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VotePage]
})
export class VotePageModule {}
