import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'container'
  },
  {
    path: 'container',
    loadChildren: () => import('./pages/container/container.module').then( m => m.ContainerPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['login'])
    }
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
