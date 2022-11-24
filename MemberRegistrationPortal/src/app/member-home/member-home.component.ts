import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dependents } from '../dependents';
import { Member } from '../member';

@Component({
  selector: 'app-member-home',
  templateUrl: './member-home.component.html',
  styleUrls: ['./member-home.component.css']
})
export class MemberHomeComponent implements OnInit {

  member: Member = new Member();
  selectedDependent!: Dependents;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

  this.activatedRoute.paramMap.subscribe(params => { 
    this.member = JSON.parse(params.get("member")!);
    console.log(this.member.memberId);
    
  });

  }

  memberRegister(){

  }

  updateMemberDetails(){

  }

  addDependent(){

  }

  onSelect(dependent: Dependents){
    this.selectedDependent = dependent;
  }

}
