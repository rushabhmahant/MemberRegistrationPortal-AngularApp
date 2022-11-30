import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MemberRegistrationPortal';

  userSession: boolean = false;

  constructor(private router: Router) { }

  login(){
    this.router.navigate(['login']);
  }

  logout(){
    sessionStorage.removeItem('memberId');
    this.router.navigate(['login']);
  }

  switchButton(){
    return (sessionStorage.getItem('memberId') == null);
  }

}
