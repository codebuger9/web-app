import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopsMallsPage } from './shops-malls.page';

describe('ShopsMallsPage', () => {
  let component: ShopsMallsPage;
  let fixture: ComponentFixture<ShopsMallsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopsMallsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopsMallsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
