import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorColleaguesHeaderComponent } from './supervisor-colleagues-header.component';

describe('SupervisorColleaguesHeaderComponent', () => {
  let component: SupervisorColleaguesHeaderComponent;
  let fixture: ComponentFixture<SupervisorColleaguesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisorColleaguesHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupervisorColleaguesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
