import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OffersListPage } from './offers-list.page';

describe('OffersListPage', () => {
  let component: OffersListPage;
  let fixture: ComponentFixture<OffersListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OffersListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
