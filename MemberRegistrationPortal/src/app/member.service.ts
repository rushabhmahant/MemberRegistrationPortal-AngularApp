import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Member } from './member';
import { Dependents } from './dependents';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private httpClient: HttpClient) { }

  //baseUrl: string = "http://localhost:7001/api/v1/mrp";
  baseUrl: string = "http://Mrpmemberservice-env.eba-3g9iuhmq.ap-northeast-1.elasticbeanstalk.com/api/v1/mrp";

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

  addDependent(memberId: string, dependent: Dependents): Observable<Member>{
    return this.httpClient.post<Member>(this.baseUrl + "/member/" + memberId +"/add-dependent", dependent)
  }

  editDependent(memberId: string, dependent: Dependents): Observable<Member>{
    return this.httpClient.post<Member>(this.baseUrl + "/member/" + memberId +"/edit-dependent", dependent);
  }

  removeDependent(memberId: string, dependentId: string): Observable<Member>{
    return this.httpClient.delete<Member>(this.baseUrl + "/member/" + 
      memberId + "/remove-dependent/" + dependentId);
  }

  updateMember(memberId: string, member: Member): Observable<Member>{
    return this.httpClient.post<Member>(this.baseUrl + "/member/" + member.memberId + "/update-member/", member)
  }

}
