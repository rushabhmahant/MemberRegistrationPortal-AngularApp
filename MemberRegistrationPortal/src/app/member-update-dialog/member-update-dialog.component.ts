import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CountryService } from '../country.service';
import { Member } from '../member';
import { MemberService } from '../member.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return (control && control.invalid)!;
  }
}

@Component({
  selector: 'app-member-update-dialog',
  templateUrl: './member-update-dialog.component.html',
  styleUrls: ['./member-update-dialog.component.css']
})
export class MemberUpdateDialogComponent implements OnInit {

  memberUpdateForm!: FormGroup;

  panPattern = /^([a-zA-Z0-9])*$/;
  contactNoPattern = /^([0-9])*$/;
  emailPattern = /^[a-zA-Z0-9]{1}([a-zA-Z0-9._%-]?)+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  matcher = new MyErrorStateMatcher();

  countries!: any[];
  states: any[] =[];
  cities: any[] = [];

  selectedCountry!: string;
  selectedState!: string;
  selectedCity!: string;

  member: Member = new Member();

  country = new FormControl(null, [Validators.required]);
  state = new FormControl({ value: null, disabled: true }, [
    Validators.required,
  ]);
  city = new FormControl({ value: null, disabled: true }, [
    Validators.required,
  ])

  constructor(private formBuilder: FormBuilder, private matDialog: MatDialog,
    private countryService: CountryService, private dialogRef: MatDialogRef<MemberUpdateDialogComponent>,
    private memberService: MemberService, private router: Router, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {

    this.countryService.getAllCountries().subscribe(
      data => {
        console.log("All countries fetched")
        this.countries = data.Countries;
        this.state.reset();
        this.city.reset();
      },
      error => {
        console.log("Error while fetching countries")
      }
    );

    this.memberUpdateForm = this.formBuilder.group({
      memberEmailId:['',[
        Validators.required,
        Validators.pattern(this.emailPattern)
      ]],
      memberPAN:['',[
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
        Validators.pattern(this.panPattern)
      ]],
      memberCountry:['',Validators.required],
      memberState:this.state,
      memberContactNo:['',[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(this.contactNoPattern)
      ]],
      memberAddress:['',[
        Validators.required,
        Validators.maxLength(80)
      ]]

    });

    if(this.data){
      this.member = this.data.member;
      console.log(this.member);
      this.memberUpdateForm.get('memberEmailId')?.setValue(this.member.memberEmailId);
      this.memberUpdateForm.get('memberPAN')?.setValue(this.member.memberPAN);
      this.memberUpdateForm.get('memberCountry')?.setValue(this.member.memberCountry);
      this.memberUpdateForm.get('memberState')?.setValue(this.member.memberState);
      this.memberUpdateForm.get('memberContactNo')?.setValue(this.member.memberContactNo);
      this.memberUpdateForm.get('memberAddress')?.setValue(this.member.memberAddress);
    }

  }

  onChangeCountry(countryValue: any) {
    //this.registrationForm.controls['state'].setErrors({ 'required': true})
    this.state.reset();
    this.state.disable();
    if(countryValue){
      this.selectedCountry = countryValue;
      this.states=this.countries[countryValue].States;
      this.state.enable();
    }
  }

  onChangeState(stateValue: any) {
    this.city.reset();
    this.city.disable();
    if(stateValue){
      this.city.enable();
    }
    this.selectedState = stateValue;
    this.cities=this.states[stateValue].Cities;
  }

  updateMember(){

  }

  exit(){
    let showLoginButtons = true;
    this.dialogRef.close();
  }

}
