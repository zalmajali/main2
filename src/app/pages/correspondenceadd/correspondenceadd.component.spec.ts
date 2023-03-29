import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CorrespondenceaddComponent } from './correspondenceadd.component';

describe('CorrespondenceaddComponent', () => {
  let component: CorrespondenceaddComponent;
  let fixture: ComponentFixture<CorrespondenceaddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrespondenceaddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CorrespondenceaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
