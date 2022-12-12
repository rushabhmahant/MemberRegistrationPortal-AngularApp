import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Claim } from './claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private httpClient: HttpClient) { }

  //baseUrl: string = "http://localhost:7002/claimservices";
  baseUrl: string = "http://Mrpclaimservice-env.eba-wpmardru.ap-northeast-1.elasticbeanstalk.com/claimservices";

  getMemberClaims(memberId: string): Observable<Claim[]>{
    return this.httpClient.get<Claim[]>(this.baseUrl + "/get-member-claims/" + memberId);
  }

  submitClaim(memberId: string, claim: Claim): Observable<Claim> {
    return this.httpClient.post<Claim>(this.baseUrl + "/submit-claim/" + memberId, claim);
  }
}
