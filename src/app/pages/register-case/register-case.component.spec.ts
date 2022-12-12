import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCaseComponent } from './register-case.component';

describe('RegisterCaseComponent', () => {
  let component: RegisterCaseComponent;
  let fixture: ComponentFixture<RegisterCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
