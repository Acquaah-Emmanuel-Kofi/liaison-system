import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerStudentsHeaderComponent } from './lecturer-students-header.component';

describe('LecturerStudentsHeaderComponent', () => {
  let component: LecturerStudentsHeaderComponent;
  let fixture: ComponentFixture<LecturerStudentsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerStudentsHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LecturerStudentsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
