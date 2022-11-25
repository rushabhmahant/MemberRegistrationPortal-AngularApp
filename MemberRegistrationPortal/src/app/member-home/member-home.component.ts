import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Dependents } from '../dependents';
import { Member } from '../member';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-member-home',
  templateUrl: './member-home.component.html',
  styleUrls: ['./member-home.component.css']
})
export class MemberHomeComponent implements OnInit {

  member: Member = new Member();
  selectedDependent!: Dependents;

  constructor(private activatedRoute: ActivatedRoute, private matDialog: MatDialog) { }

  ngOnInit(): void {

  this.activatedRoute.paramMap.subscribe(params => { 
    this.member = JSON.parse(params.get("member")!);
    console.log(this.member.memberId);
    
  });

  }

  memberRegister(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;

    const dialogRef = this.matDialog.open(RegistrationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // this.showLoginButton = result;
      // this.showSignupButton = result;
    });
  }

  updateMemberDetails(){

  }

  addDependent(){

  }

  onSelect(dependent: Dependents){
    this.selectedDependent = dependent;
  }

}
