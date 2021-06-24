import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MallContainerPage } from './mall-container.page';

describe('MallContainerPage', () => {
  let component: MallContainerPage;
  let fixture: ComponentFixture<MallContainerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MallContainerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MallContainerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
