import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Claim } from '../claim';
import { ClaimService } from '../claim.service';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-claims',
  templateUrl: './member-claims.component.html',
  styleUrls: ['./member-claims.component.css']
})
export class MemberClaimsComponent implements OnInit {

  member: Member = new Member();
  memberClaims: Claim[] = [];

  constructor(private memberService: MemberService,
    private claimService: ClaimService, private activatedRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<MemberClaimsComponent>,  @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {

    if(this.data){
      this.member.memberId = this.data.memberId;
      this.getMemberDetails(this.member.memberId);
      this.getMemberClaims(this.member.memberId);
    }

    // this.activatedRoute.paramMap.subscribe(params => { 
    //   console.log("params: " + params);
    //   this.member.memberId = params.get("memberId")?.toString()!; 

    //   this.getMemberDetails(this.member.memberId);
    //   this.getMemberClaims(this.member.memberId);

    // });

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
    );
  }
  
  getMemberClaims(memberId: string) {
    this.claimService.getMemberClaims(this.member.memberId).subscribe(
      data => {
        this.memberClaims = data;
        console.log(data);
      },
      error => {
        console.log(error);
        alert("Cannot fetch your claims, please try again later.")
      }
    );
  }

  goBack(){
    this.dialogRef.close(this.member);
  }

}
