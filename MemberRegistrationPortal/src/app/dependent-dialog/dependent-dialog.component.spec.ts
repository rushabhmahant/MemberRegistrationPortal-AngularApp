import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentDialogComponent } from './dependent-dialog.component';

describe('DependentDialogComponent', () => {
  let component: DependentDialogComponent;
  let fixture: ComponentFixture<DependentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
