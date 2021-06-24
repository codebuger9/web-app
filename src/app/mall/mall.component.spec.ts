import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MallComponent } from './mall.component';

describe('MallComponent', () => {
  let component: MallComponent;
  let fixture: ComponentFixture<MallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MallComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
