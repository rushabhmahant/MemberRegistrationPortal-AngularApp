import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberHomeComponent } from './member-home/member-home.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanDeactivate<MemberHomeComponent> {
  constructor(private router: Router){}
  canDeactivate(component: MemberHomeComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot | undefined): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(sessionStorage.getItem('memberId') == null){
      return true;
    }
    if(confirm("You will be logged out of the application")){
      sessionStorage.removeItem('memberId');
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(sessionStorage.getItem('memberId')){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
