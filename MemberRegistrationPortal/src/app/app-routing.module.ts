import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimDialogComponent } from './claim-dialog/claim-dialog.component';
import { DependentDialogComponent } from './dependent-dialog/dependent-dialog.component';
import { LoginComponent } from './login/login.component';
import { MemberHomeComponent } from './member-home/member-home.component';
import { MemberUpdateDialogComponent } from './member-update-dialog/member-update-dialog.component';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'member-home/:member', component: MemberHomeComponent},
  {path: 'registration', component: RegistrationDialogComponent},
  {path: 'add-dependent', component: DependentDialogComponent},
  {path: 'submit-claim', component: ClaimDialogComponent},
  {path: 'member-update', component: MemberUpdateDialogComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
