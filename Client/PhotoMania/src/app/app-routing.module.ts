import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    // if empty path -> go to home (so, home is default page)
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule)
  },
  {
    path: 'found-posts/:key',
    loadChildren: () => import('./pages/found-posts/found-posts.module').then(m => m.FoundPostsModule)
  },
  {
    path: 'found-user/:name',
    loadChildren: () => import('./pages/found-user/found-user.module').then(m => m.FoundUserModule)
  },
  {
    path: 'found-user/:name',
    loadChildren: () => import('./pages/found-user/found-user.module').then(m => m.FoundUserModule)
  },
  {
    path: 'view-post-comments/:id',
    loadChildren: () => import('./pages/view-post-comments/view-post-comments.module').then(m => m.ViewPostCommentsModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
