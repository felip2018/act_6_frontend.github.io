import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCasesComponent } from './get-cases.component';

describe('GetCasesComponent', () => {
  let component: GetCasesComponent;
  let fixture: ComponentFixture<GetCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetCasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
