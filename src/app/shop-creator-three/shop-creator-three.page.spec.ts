import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopCreatorThreePage } from './shop-creator-three.page';

describe('ShopCreatorThreePage', () => {
  let component: ShopCreatorThreePage;
  let fixture: ComponentFixture<ShopCreatorThreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCreatorThreePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopCreatorThreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
