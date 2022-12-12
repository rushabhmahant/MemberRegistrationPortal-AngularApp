import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dependents } from '../dependents';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-dependent-dialog',
  templateUrl: './dependent-dialog.component.html',
  styleUrls: ['./dependent-dialog.component.css']
})
export class DependentDialogComponent implements OnInit {

  dependentForm!: FormGroup;
  member: Member = new Member();
  newDependent: Dependents = new Dependents();  //  For adding new Dependent
  existingDependent: Dependents = new Dependents(); //  For updating existing dependent

  namePattern = /^([a-zA-Z])*$/;
  maxDate = new Date();

  performUpdate: boolean = false;

  constructor(private formBuilder: FormBuilder, private matDialog: MatDialog,
    private dialogRef: MatDialogRef<DependentDialogComponent>, 
    private memberService: MemberService, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {

    this.dependentForm = this.formBuilder.group({
      dependentFirstName:['',[
        Validators.required,
        Validators.pattern(this.namePattern)
      ]],
      dependentLastName:['',[
        Validators.required,
        Validators.pattern(this.namePattern)
      ]],
      dependentDOB:['', Validators.required]

    });

    if(this.data){
      this.performUpdate =  true;
      this.existingDependent.dependentId = this.data.dependentId;
      var name = this.data.dependentName.split(" ", 2)
      this.dependentForm.get('dependentFirstName')?.setValue(name[0]);
      this.dependentForm.get('dependentLastName')?.setValue(name[1]);
      this.dependentForm.get('dependentDOB')?.setValue(this.data.dependentDOB);
    }

  }

  addDependent(){
    if(this.inputValidations()){

      this.member.memberId = sessionStorage.getItem('memberId')!;
      if(this.member.memberId==null){
        alert("Member id unavailable, please try again later");
        console.log("Member id unavailable, please try again later");
        return;
      }

      this.memberService.getMemberById(this.member.memberId).subscribe(
        data => {
          console.log("Member details fetched")
          this.member = data;
          if(this.member.memberId==null){
            alert("Member id cannot be fetched, please try again later");
            return;
          }
          this.saveMemberDetailsWithDependent();
        },
        error => {
          console.log(error);
          alert("Unable to add dependent, please try again later");
        }
      );

    }
    else{
      alert("Please provide required inputs in correct format!\n\n" +
      "\u2022 Please provide Full name of dependent.\n" +
      "\u2022 Please provide Date of Birth of dependent.");
    }
  }

  saveMemberDetailsWithDependent(){
    this.newDependent.dependentName = this.dependentForm.get('dependentFirstName')?.value + " " + this.dependentForm.get('dependentLastName')?.value;
    this.newDependent.dependentDOB = this.dependentForm.get('dependentDOB')?.value;
    this.newDependent.dependentDOB.setDate(this.newDependent.dependentDOB.getDate() + 1);
    this.memberService.addDependent(this.member.memberId, this.newDependent).subscribe(
      data => {
        console.log(data);
        alert("Dependent added successfully!");
        this.member = data;
        this.dialogRef.close(this.member);
        //this.matDialog.closeAll();
      },
      error => {
        if(error.error != undefined){
          alert(error.error.errorMessage);
        }
        else{
          alert("Unable to add dependent, please try again later");
          console.log(error)
        }
      }
    );
  }

  updateDependent(){
    if(this.inputValidations()){

      this.member.memberId = sessionStorage.getItem('memberId')!;
      if(this.member.memberId==null){
        alert("Member id unavailable, please try again later");
        console.log("Member id unavailable, please try again later");
        return;
      }

      this.memberService.getMemberById(this.member.memberId).subscribe(
        data => {
          console.log("Member details fetched")
          this.member = data;
          if(this.member.memberId==null){
            alert("Member id cannot be fetched, please try again later");
            return;
          }
          this.editMemberDependent();
        },
        error => {
          console.log(error);
          alert("Unable to add dependent, please try again later");
        }
      );

    }
    else{
      alert("Please provide required inputs in correct format!\n\n" +
      "\u2022 Please provide Full name of dependent.\n" +
      "\u2022 Please provide Date of Birth of dependent.");
    }
  }

  editMemberDependent(){
    this.existingDependent.dependentName = this.dependentForm.get('dependentFirstName')?.value + " " + this.dependentForm.get('dependentLastName')?.value;
    this.existingDependent.dependentDOB = this.dependentForm.get('dependentDOB')?.value;
    //  Below condition check to match Angular Date with Java Date
    if(this.existingDependent.dependentDOB.toString().length != 10){
      this.existingDependent.dependentDOB.setDate(this.existingDependent.dependentDOB.getDate() + 1);
    }
    this.memberService.editDependent(this.member.memberId, this.existingDependent).subscribe(
      data => {
        console.log(data);
        alert("Dependent details updated successfully!");
        this.member = data;
        this.dialogRef.close(this.member);
      },
      error => {
        if(error.error != undefined){
          alert(error.error.errorMessage);
        }
        else{
          alert("Unable to add dependent, please try again later");
          console.log(error)
        }
      }
    );
  }

  inputValidations(){
    if(this.dependentForm.get('dependentFirstName')?.errors || this.dependentForm.get('dependentLastName')?.errors || this.dependentForm.get('dependentDOB')?.errors){
      return false;
    }
    return true;
  }

  addOrUpdate(){
    return this.performUpdate;
  }

  exit(){
    this.dialogRef.close();
  }

}
