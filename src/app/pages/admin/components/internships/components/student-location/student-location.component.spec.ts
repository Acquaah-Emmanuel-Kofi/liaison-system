import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLocationComponent } from './student-location.component';

describe('StudentLocationComponent', () => {
  let component: StudentLocationComponent;
  let fixture: ComponentFixture<StudentLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
