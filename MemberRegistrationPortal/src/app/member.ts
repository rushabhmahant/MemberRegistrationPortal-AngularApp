import { Dependents } from "./dependents";

export class Member {

    memberId!: string;
    memberEmailId!: string;
    memberFirstName!: string;
    memberLastName!: string;
    memberPassword!: string;
    memberDOB!: Date;
    memberAge!: number;
    memberContactNo!: number;
    memberPAN!: string;
    memberActivationDate!: Date;
    memberCountry!:  string;
    memberState!:  string;
    memberAddress!: string;
    memberIsRegistered!: boolean
    memberDependents!: Dependents[];

}
