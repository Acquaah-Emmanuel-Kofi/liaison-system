import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorColleaguesComponent } from './supervisor-colleagues.component';

describe('SupervisorColleaguesComponent', () => {
  let component: SupervisorColleaguesComponent;
  let fixture: ComponentFixture<SupervisorColleaguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisorColleaguesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupervisorColleaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
