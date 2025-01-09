import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDutyComponent } from './upload-duty.component';

describe('UploadDutyComponent', () => {
  let component: UploadDutyComponent;
  let fixture: ComponentFixture<UploadDutyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadDutyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
