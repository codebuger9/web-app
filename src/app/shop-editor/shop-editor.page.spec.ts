import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopEditorPage } from './shop-editor.page';

describe('ShopEditorPage', () => {
  let component: ShopEditorPage;
  let fixture: ComponentFixture<ShopEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopEditorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
