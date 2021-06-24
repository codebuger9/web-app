import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MallsGridPage } from './malls-grid.page';

describe('MallsGridPage', () => {
  let component: MallsGridPage;
  let fixture: ComponentFixture<MallsGridPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MallsGridPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MallsGridPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
