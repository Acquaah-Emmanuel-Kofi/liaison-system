import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssumptionOfDutyComponent } from './assumption-of-duty.component';

describe('AssumptionOfDutyComponent', () => {
  let component: AssumptionOfDutyComponent;
  let fixture: ComponentFixture<AssumptionOfDutyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssumptionOfDutyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssumptionOfDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
