import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MallCreatorPage } from './mall-creator.page';

describe('MallCreatorPage', () => {
  let component: MallCreatorPage;
  let fixture: ComponentFixture<MallCreatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MallCreatorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MallCreatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
