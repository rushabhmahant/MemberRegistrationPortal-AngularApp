import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberClaimsComponent } from './member-claims.component';

describe('MemberClaimsComponent', () => {
  let component: MemberClaimsComponent;
  let fixture: ComponentFixture<MemberClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
