import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'admin-login', loadChildren: './pages/admin/admin-login/admin-login.module#AdminLoginPageModule'},
  { path: 'admin-reg', loadChildren: './pages/admin/admin-reg/admin-reg.module#AdminRegPageModule'},
  { path: 'menu', loadChildren: './pages/admin/menu/menu.module#MenuPageModule' },
  { path: 'login', loadChildren: './pages/user/login/login.module#LoginPageModule' },
  { path: 'reg', loadChildren: './pages/user/reg/reg.module#RegPageModule' },
  { path: 'voter', loadChildren: './pages/user/vote/vote.module#VotePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
