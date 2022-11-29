import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DependentDialogComponent } from '../dependent-dialog/dependent-dialog.component';
import { Dependents } from '../dependents';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-member-home',
  templateUrl: './member-home.component.html',
  styleUrls: ['./member-home.component.css']
})
export class MemberHomeComponent implements OnInit {

  member: Member = new Member();
  selectedDependent!: Dependents;

  constructor(private activatedRoute: ActivatedRoute, private matDialog: MatDialog,
    private memberService: MemberService) { }

  ngOnInit(): void {

  this.activatedRoute.paramMap.subscribe(params => { 
    this.member = JSON.parse(params.get("member")!);
    console.log(this.member.memberId);
    this.getMemberDetails(this.member.memberId);
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
      console.log(result)
      if(result!= null && result!=undefined){
      this.member = result;
      }
    });
  }

  updateMemberDetails(){

  }

  addDependent(){
    const dependentdDialogConfig = new MatDialogConfig();
    dependentdDialogConfig.autoFocus = false;
    dependentdDialogConfig.restoreFocus = false;
    const dialogRef = this.matDialog.open(DependentDialogComponent, dependentdDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // this.showLoginButton = result;
      // this.showSignupButton = result;
      console.log(result)
      if(result!= null && result!=undefined){
      this.member = result;
      }
    });

  }

  editDependent(dependent: Dependents){

    const dependentdDialogConfig = new MatDialogConfig();
    dependentdDialogConfig.autoFocus = false;
    dependentdDialogConfig.restoreFocus = false;
    dependentdDialogConfig.data = {
      dependentId: dependent.dependentId,
      dependentName: dependent.dependentName,
      dependentDOB: dependent.dependentDOB
  };
    const dialogRef = this.matDialog.open(DependentDialogComponent, dependentdDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // this.showLoginButton = result;
      // this.showSignupButton = result;
      console.log(result)
      if(result!= null && result!=undefined){
      this.member = result;
      }
    });


  }

  removeDependent(dependentId: string){
    if(confirm("Remove dependent "+dependentId+"?")){
    this.memberService.removeDependent(this.member.memberId, dependentId).subscribe(
      data => {
        console.log(data);
        alert("Dependent removed successfully!");
        this.member = data;

      },
      error => {
        if(error.error != undefined){
          alert(error.error.errorMessage);
        }
        else{
          alert("Unable to remove dependent, please try again later");
          console.log(error)
        }
      }
    );
    }
  }

  getMemberDetails(memberId: string){
    this.memberService.getMemberById(memberId).subscribe(
      data => {
        this.member = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  onSelect(dependent: Dependents){
    this.selectedDependent = dependent;
  }

}
