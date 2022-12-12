import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GetCasesComponent } from './pages/get-cases/get-cases.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterCaseComponent } from './pages/register-case/register-case.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'register-case',
    canActivate: [AuthGuard],
    component: RegisterCaseComponent
  },
  {
    path: 'get-cases',
    canActivate: [AuthGuard],
    component: GetCasesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
