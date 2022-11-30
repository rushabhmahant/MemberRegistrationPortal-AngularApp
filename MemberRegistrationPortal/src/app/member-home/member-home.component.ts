import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ClaimDialogComponent } from '../claim-dialog/claim-dialog.component';
import { DependentDialogComponent } from '../dependent-dialog/dependent-dialog.component';
import { Dependents } from '../dependents';
import { Member } from '../member';
import { MemberUpdateDialogComponent } from '../member-update-dialog/member-update-dialog.component';
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
    dialogConfig.data = {
      member: this.member
    };
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

  updateMemberDetails(member: Member){
    const updateMemberDialogConfig = new MatDialogConfig();
    updateMemberDialogConfig.autoFocus = false;
    updateMemberDialogConfig.restoreFocus = false;
    updateMemberDialogConfig.data = {
      //memberId: member.memberId
      member: member
  };
    const dialogRef = this.matDialog.open(MemberUpdateDialogComponent, updateMemberDialogConfig);

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

    const dependentDialogConfig = new MatDialogConfig();
    dependentDialogConfig.autoFocus = false;
    dependentDialogConfig.restoreFocus = false;
    dependentDialogConfig.data = {
      dependentId: dependent.dependentId,
      dependentName: dependent.dependentName,
      dependentDOB: dependent.dependentDOB
  };
    const dialogRef = this.matDialog.open(DependentDialogComponent, dependentDialogConfig);

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

  submitClaim(member: Member){
    const claimDialogConfig = new MatDialogConfig();
    claimDialogConfig.autoFocus = false;
    claimDialogConfig.restoreFocus = false;
    claimDialogConfig.data = {
      // dependentId: dependent.dependentId,
      // dependentName: dependent.dependentName,
      // dependentDOB: dependent.dependentDOB
      memberId: member.memberId
  };
    const dialogRef = this.matDialog.open(ClaimDialogComponent, claimDialogConfig);

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
