import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneHeaderComponent } from './zone-header.component';

describe('ZoneHeaderComponent', () => {
  let component: ZoneHeaderComponent;
  let fixture: ComponentFixture<ZoneHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZoneHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
