import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletalComponent } from './skeletal.component';

describe('SkeletalComponent', () => {
  let component: SkeletalComponent;
  let fixture: ComponentFixture<SkeletalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkeletalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
