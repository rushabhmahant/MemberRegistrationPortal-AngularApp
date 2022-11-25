import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CountryService } from '../country.service';

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

  panPattern = /^([a-zA-Z0-9_-])*$/;
  matcher = new MyErrorStateMatcher();

  countries!: any[];
  states: any[] =[];
  cities: any[] = [];

  selectedCountry!: string;
  selectedState!: string;
  selectedCity!: string;

  country = new FormControl(null, [Validators.required]);
  state = new FormControl({ value: null, disabled: true }, [
    Validators.required,
  ]);
  city = new FormControl({ value: null, disabled: true }, [
    Validators.required,
  ])

  constructor(private formBuilder: FormBuilder, private matDialog: MatDialog,
    private countryService: CountryService, private dialogRef: MatDialogRef<RegistrationDialogComponent>) { }

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

    this.registrationForm = this.formBuilder.group({
      memberPAN:['',[
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
        Validators.pattern(this.panPattern)
      ]],
      memberCountry:['',Validators.required],
      memberState:this.state,
      memberContactNo:['',Validators.required],
      memberAddress:['',Validators.required],

    });

  }

  register(){
    if(this.inputValidations()){

    }
    else{
      alert("Please provide required inputs in correct format!\n\n" + 
      "\u2022 Select country and state from the dropdown lists.\n" +
      "\u2022 PAN must contain 12 alphanumeric characters.\n" +
      "\u2022 Contact No. should be of 10 digits.");
    }

  }

  inputValidations(){
    console.log(this.registrationForm.get('memberPAN')?.errors);
    console.log(this.registrationForm.get('memberCountry')?.errors);
    console.log(this.registrationForm.get('membeState')?.errors);
    console.log(this.registrationForm.get('memberContactNo')?.errors);
    console.log(this.registrationForm.get('memberAddress')?.errors);
    if(this.registrationForm.get('memberPAN')?.errors || this.registrationForm.get('memberCountry')?.errors ||
    this.registrationForm.get('membeState')?.errors || this.registrationForm.get('memberContactNo')?.errors ||
    this.registrationForm.get('memberAddress')?.errors){
      return false;
    }
    return true;
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
    this.dialogRef.close(showLoginButtons);
  }

}
