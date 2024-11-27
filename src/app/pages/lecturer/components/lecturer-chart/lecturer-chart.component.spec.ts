import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerChartComponent } from './lecturer-chart.component';

describe('LecturerChartComponent', () => {
  let component: LecturerChartComponent;
  let fixture: ComponentFixture<LecturerChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LecturerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
