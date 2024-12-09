import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColleagueHeaderComponent } from './colleague-header.component';

describe('ColleagueHeaderComponent', () => {
  let component: ColleagueHeaderComponent;
  let fixture: ComponentFixture<ColleagueHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColleagueHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColleagueHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
