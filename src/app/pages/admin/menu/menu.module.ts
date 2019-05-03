import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'dash',
        loadChildren: '../dashboard/dashboard.module#DashboardPageModule'
      },
      {
        path: 'dash/list',
        loadChildren: '../list/list.module#ListPageModule'
      },
      {
        path: 'new',
        loadChildren: '../new-poll/new-poll.module#NewPollPageModule'
      },
      {
        path: 'pend',
        loadChildren: '../pending/pending.module#PendingPageModule'
      },
      {
        path: 'auth',
        loadChildren: '../authorised/authorised.module#AuthorisedPageModule'
      },
      {
        path: 'arch',
        loadChildren: '../archives/archives.module#ArchivesPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
