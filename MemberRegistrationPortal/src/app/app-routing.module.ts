import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MemberHomeComponent } from './member-home/member-home.component';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'member-home/:member', component: MemberHomeComponent},
  {path: 'registration', component: RegistrationDialogComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
