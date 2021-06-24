import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopCreatorOnePage } from './shop-creator-one.page';

describe('ShopCreatorOnePage', () => {
  let component: ShopCreatorOnePage;
  let fixture: ComponentFixture<ShopCreatorOnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCreatorOnePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopCreatorOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
