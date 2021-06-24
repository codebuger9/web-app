import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopCreatorTwoPage } from './shop-creator-two.page';

describe('ShopCreatorTwoPage', () => {
  let component: ShopCreatorTwoPage;
  let fixture: ComponentFixture<ShopCreatorTwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCreatorTwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopCreatorTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
