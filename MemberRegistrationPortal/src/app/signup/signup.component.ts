import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  newMember: Member = new Member();

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  signupForm!:FormGroup;

  namePattern = /^([a-zA-Z]?)+$/;
  emailPattern = /^[a-zA-Z0-9]{1}([a-zA-Z0-9._%-]?)+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  passwordPattern = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{0,}$/;
  maxDate = new Date();

  constructor(private formBuilder: FormBuilder, private memberService: MemberService,
    private router: Router) { }

  ngOnInit(): void {

    this.signupForm = this.formBuilder.group({
      memberFirstName:['',[
        Validators.required,
        Validators.pattern(this.namePattern)
      ]],
      memberLastName:['',[
        Validators.required,
        Validators.pattern(this.namePattern)
      ]],
      memberDOB: ['',Validators.required],
      memberEmailId:['',[
        Validators.required,
        Validators.pattern(this.emailPattern)
      ]],
      memberPassword:['',[
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.passwordPattern)
      ]],
      confirmPassword:['',[
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.passwordPattern)
      ]]
    })

  }

  memberSignup(){
    if(this.inputValidations()){

      if(this.signupForm.get('memberPassword')?.value != this.signupForm.get('confirmPassword')?.value){
        alert("Passwords do not match!");
        return;
      }
      
      this.newMember.memberFirstName = this.signupForm.get('memberFirstName')?.value;
      this.newMember.memberLastName = this.signupForm.get('memberLastName')?.value;
      this.newMember.memberDOB = this.signupForm.get('memberDOB')?.value;
      this.newMember.memberDOB.setDate(this.newMember.memberDOB.getDate() + 1);
      this.newMember.memberEmailId = this.signupForm.get('memberEmailId')?.value;
      this.newMember.memberPassword = this.signupForm.get('memberPassword')?.value;
      
    
    this.memberService.signup(this.newMember).subscribe(
      data => {
        console.log(data);
        alert("Member signup succesful!");
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
        if(error.error != undefined){
          alert(error.error.errorMessage);
        }
        else{
          alert("Unable to signup, please try again later");
        }
      }
    );
    }
    else{
      alert("Please provide required inputs in correct format!\n\n" + 
      "First name and last name should not contain space or special characters.\n" +
      "Email id should be in the form abc@example.com.\n" +
      "Password should match the following conditions:\n" +
      "\u2022 Password should be atleast 8 characters long.\n" + 
      "\u2022 Password should contain atleast one uppercase character.\n" +
      "\u2022 Password should contain atleast one numeric and one special character.");
      //alert("!!! WARNING !!!\n\nHeader\n\u2022Point1\n\u2022Point2")
    }

  }

  inputValidations(){
    if(this.signupForm.get('memberEmailId')?.errors || this.signupForm.get('memberPassword')?.errors ||
    this.signupForm.get('memberFirstName')?.errors || this.signupForm.get('memberLastName')?.errors ||
    this.signupForm.get('confirmPassword')?.errors || this.signupForm.get('memberDOB')?.errors){
      return false;
    }
    return true;
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
