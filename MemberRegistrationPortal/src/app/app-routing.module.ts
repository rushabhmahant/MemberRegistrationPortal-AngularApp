import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
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
  {path: 'member-home/:member', component: MemberHomeComponent, 
  canActivate: [AuthGuard], canDeactivate: [AuthGuard]},
  {path: 'registration', component: RegistrationDialogComponent, 
  canActivate: [AuthGuard]},
  {path: 'add-dependent', component: DependentDialogComponent, 
  canActivate: [AuthGuard]},
  {path: 'submit-claim', component: ClaimDialogComponent, 
  canActivate: [AuthGuard]},
  {path: 'member-update', component: MemberUpdateDialogComponent, 
  canActivate: [AuthGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
