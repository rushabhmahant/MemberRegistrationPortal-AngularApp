import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Claim } from '../claim';
import { ClaimService } from '../claim.service';
import { Dependents } from '../dependents';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-claim-dialog',
  templateUrl: './claim-dialog.component.html',
  styleUrls: ['./claim-dialog.component.css']
})
export class ClaimDialogComponent implements OnInit {

  claimForm!: FormGroup;
  member: Member = new Member();
  dependent: Dependents = new Dependents();
  claim: Claim = new Claim();

  billAmountPattern = /^([0-9.])*$/;
  maxDate = new Date();

  constructor(private formBuilder: FormBuilder, private matDialog: MatDialog,
    private dialogRef: MatDialogRef<ClaimDialogComponent>, private memberService: MemberService,
    private claimService: ClaimService, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {

    this.claimForm = this.formBuilder.group({
      dependent:['',[
        Validators.required,
      ]],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      dateOfBirth:['', Validators.required],
      dateOfAdmission:['', Validators.required],
      dateOfDischarge:['', Validators.required],
      providerName:['', Validators.required],
      billAmount:['', [
        Validators.required,
        Validators.pattern(this.billAmountPattern)
      ]]
    });

    if(this.data){
      //this.performUpdate =  true;
      this.member.memberId = this.data.memberId;
      this.memberService.getMemberById(this.member.memberId).subscribe(
        data => {
          console.log("Member details fetched");
          this.member = data;
          //this.dependents = this.member.memberDependents;
        },
        error => {
        console.log(error);
        if(error.error != undefined){
          alert(error.error.errorMessage);
        }
        else{
          alert("Unable to fetch member details, please try again later");
        }
      }
      );
    }

  }

  submitClaim(){

    if(this.inputValidations()){

      this.member.memberId = sessionStorage.getItem('memberId')!;
      if(this.member.memberId==null){
        alert("Member id unavailable, please try again later");
        console.log("Member id unavailable, please try again later");
        return;
      }
          this.saveMemberClaim();
    }
    else{
      alert("Please provide required inputs in correct format!\n\n" +
      "\u2022 Please select dependent from the dropdown list.\n" +
      "\u2022 Please provide Date of Admission and Date of Discharge.\n" +
      "\u2022 Ensure Date of Admission falls on or before Date of Discharge.\n" +
      "\u2022 Please provide Provider name and total bill amount.");
    }

  }

  inputValidations(){
    if(this.claimForm.get('dependent')?.errors || this.claimForm.get('firstName')?.errors || this.claimForm.get('lastName')?.errors
    || this.claimForm.get('dateOfBirth')?.errors || this.claimForm.get('dateOfAdmission')?.errors || this.claimForm.get('dateOfDischarge')?.errors
    || this.claimForm.get('providerName')?.errors || this.claimForm.get('billAmount')?.errors){
      return false;
    }
    return true;
  }

  saveMemberClaim(){
    this.claim.memberId = this.member.memberId;
    this.claim.dependentId = (this.claimForm.get('dependent')?.value != "self") ? this.claimForm.get('dependent')?.value : null;
    console.log(this.claim.dependentId);
    this.claim.firstName = this.claimForm.get('firstName')?.value;
    this.claim.lastName = this.claimForm.get('lastName')?.value;
    this.claim.dateOfBirth = this.claimForm.get('dateOfBirth')?.value;
    this.claim.dateOfAdmission = this.claimForm.get('dateOfAdmission')?.value;
    this.claim.dateOfDischarge = this.claimForm.get('dateOfDischarge')?.value;
    this.claim.dateOfAdmission.setDate(this.claim.dateOfAdmission.getDate() + 1);
    this.claim.dateOfDischarge.setDate(this.claim.dateOfDischarge.getDate() + 1);
    this.claim.providerName = this.claimForm.get('providerName')?.value;
    this.claim.totalBillAmount = this.claimForm.get('billAmount')?.value;

    this.claimService.submitClaim(this.member.memberId, this.claim).subscribe(
      data => {
        this.claim = data;
        console.log(data);
        alert("Claim submitted successfully.\nYour Claim No. is: " + this.claim.claimId);
        this.dialogRef.close(this.member);
      },
      error => {
        console.log(error);
        if(error.error != undefined){
          alert(error.error.errorMessage);
        }
        else{
          alert("Unable to submit claim, please try again later");
        }
      }
    );
  }

  onSelectDependent(dependentValue: string){
    if(dependentValue == "self"){
      this.claimForm.get('firstName')?.setValue(this.member.memberFirstName);
      this.claimForm.get('lastName')?.setValue(this.member.memberLastName);
      this.claimForm.get('dateOfBirth')?.setValue(this.member.memberDOB);
    }
    else{
      console.log(dependentValue);
      this.dependent = (this.member.memberDependents[0].dependentId == dependentValue) ? this.member.memberDependents[0] : this.member.memberDependents[1]; 
      console.log(this.dependent)
      var name = this.dependent.dependentName.split(" ", 2)
      this.claimForm.get('firstName')?.setValue(name[0]);
      this.claimForm.get('lastName')?.setValue(name[1]);
      this.claimForm.get('dateOfBirth')?.setValue(this.dependent.dependentDOB);
    }
  }

  exit(){
    this.dialogRef.close();
  }

}
