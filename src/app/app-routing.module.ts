import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


import { AppComponent } from './app.component';

const routes: Routes = [

  { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: 'signup', component: SignupComponent},
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
  { path: 'login', component: LoginComponent},
  {path: '**',component: PageNotFoundComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
export const routingComponents = [AppComponent,
  PageNotFoundComponent,SignupComponent,
  LoginComponent]





