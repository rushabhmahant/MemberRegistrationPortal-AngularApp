import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Member } from './member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = "http://localhost:7001/api/v1/mrp";

  login(member: Member): Observable<Member>{
    return this.httpClient.post<Member>(this.baseUrl + "/onboard/login", member);
  }
  
  signup(newMember: Member): Observable<Member>{
    return this.httpClient.post<Member>(this.baseUrl + "/onboard/signup", newMember);
  }

  getMemberById(memberId: string): Observable<Member>{
    return this.httpClient.get<Member>(this.baseUrl + "/member/" + memberId);
  }

  register(member: Member): Observable<Member>{
    return this.httpClient.post<Member>(this.baseUrl + "/member/register", member);
  }

}
