import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showPassword: boolean = false;
  loginForm!:FormGroup;
  member: Member = new Member();

  //  validations
  emailPattern = /^[a-zA-Z0-9]{1}([a-zA-Z0-9._%-]?)+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  passwordPattern = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{0,}$/;

  constructor(private formBuilder: FormBuilder, private memberService: MemberService) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      memberEmail:['',[
        Validators.required, 
        Validators.pattern(this.emailPattern)
      ]],
      memberPassword:['',[
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.passwordPattern)
      ]]
    })

  }

  memberLogin(){
    if(this.inputValidations()){
    this.member.memberEmailId = this.loginForm.get('memberEmail')?.value;
    this.member.memberPassword = this.loginForm.get('memberPassword')?.value;

    this.memberService.login(this.member).subscribe(
      data => {
        alert("Member login succesful " + data)
      },
      error => {
        console.log(error);
        if(error.error != undefined){
          alert(error.error.errorMessage);
        }
        else{
          alert("Unable to login, please try again later");
        }
      }
    );
    }
    else{
      alert("Please provide required inputs in correct format!\n\n" + 
      "Email id should be in the form abc@example.com\n" +
      "Password should match the following conditions:\n" +
      "\u2022 Password should be atleast 8 characters long\n" + 
      "\u2022 Password should contain atleast one uppercase character\n" +
      "\u2022 Password should contain atleast one numeric and one special character");
      //alert("!!! WARNING !!!\n\nHeader\n\u2022Point1\n\u2022Point2")
    }

  }

  inputValidations() {
    console.log(this.loginForm.get('memberEmail')?.errors);
    console.log(this.loginForm.get('memberPassword')?.errors)
    if(this.loginForm.get('memberEmail')?.errors || this.loginForm.get('memberPassword')?.errors){
      return false;
    }
    return true;
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
