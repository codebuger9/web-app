import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopContainerPage } from './shop-container.page';

describe('ShopContainerPage', () => {
  let component: ShopContainerPage;
  let fixture: ComponentFixture<ShopContainerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopContainerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopContainerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
