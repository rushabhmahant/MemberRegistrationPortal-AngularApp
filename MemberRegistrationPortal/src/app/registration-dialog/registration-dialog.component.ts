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
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})
export class RegistrationDialogComponent implements OnInit {

  registrationForm!: FormGroup;

  panPattern = /^([a-zA-Z0-9])*$/;
  contactNoPattern = /^([0-9])*$/;
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
    private countryService: CountryService, private dialogRef: MatDialogRef<RegistrationDialogComponent>,
    private memberService: MemberService, private router: Router,  @Inject(MAT_DIALOG_DATA) private matDialogdata: any) { }

  ngOnInit(): void {

    if(this.matDialogdata){
      this.member = this.matDialogdata.member;
    }

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

    this.registrationForm = this.formBuilder.group({
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
      ]],

    });

  }

  register(){
    if(this.inputValidations()){

      this.member.memberId = sessionStorage.getItem('memberId')!;
      if(this.member.memberId==null){
        alert("Member id unavailable, please try again later");
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
          this.saveMemberDetails();
        },
        error => {
          console.log(error);
          alert("Unable to register, please try again later");
        }
      );

    }
    else{
      alert("Please provide required inputs in correct format!\n\n" + 
      "\u2022 Select country and state from the dropdown lists.\n" +
      "\u2022 PAN must contain 12 alphanumeric characters.\n" +
      "\u2022 Contact No. should be of 10 digits.\n" + 
      "\u2022 Address should not exceed 80 characters.");
    }

  }

  inputValidations(){
    console.log(this.registrationForm.get('memberPAN')?.errors);
    console.log(this.registrationForm.get('memberCountry')?.errors);
    console.log(this.registrationForm.get('membeState')?.errors);
    console.log(this.registrationForm.get('memberContactNo')?.errors);
    console.log(this.registrationForm.get('memberAddress')?.errors);
    if(this.registrationForm.get('memberPAN')?.errors || this.registrationForm.get('memberCountry')?.errors ||
    this.registrationForm.get('memberState')?.errors || this.registrationForm.get('memberContactNo')?.errors ||
    this.registrationForm.get('memberAddress')?.errors){
      return false;
    }
    return true;
  }

  saveMemberDetails(){
    this.member.memberPAN = this.registrationForm.get('memberPAN')?.value;
    this.member.memberContactNo = this.registrationForm.get('memberContactNo')?.value;
    this.member.memberAddress = this.registrationForm.get('memberAddress')?.value;
    this.member.memberCountry = this.countries[this.registrationForm.get('memberCountry')?.value].CountryName;
    this.member.memberState = this.states[this.registrationForm.get('memberState')?.value].StateName;
    this.memberService.register(this.member).subscribe(
      data => {
        alert("Member registered successfully!");
        console.log(data);
        this.member = data;
        //this.router.navigate(['/member-home', JSON.stringify(this.member)]);
        this.dialogRef.close(this.member);
      },
      error =>{
        console.log(error);
        alert("Cannot save member details, please try again later!")
      }
    );
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

  exit(){
    let showLoginButtons = true;
    this.dialogRef.close(this.member);
  }

}
