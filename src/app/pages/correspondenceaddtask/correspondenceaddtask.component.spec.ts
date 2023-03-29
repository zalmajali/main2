import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CorrespondenceaddtaskComponent } from './correspondenceaddtask.component';

describe('CorrespondenceaddtaskComponent', () => {
  let component: CorrespondenceaddtaskComponent;
  let fixture: ComponentFixture<CorrespondenceaddtaskComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrespondenceaddtaskComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CorrespondenceaddtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
