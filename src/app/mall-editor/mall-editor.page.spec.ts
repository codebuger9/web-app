import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MallEditorPage } from './mall-editor.page';

describe('MallEditorPage', () => {
  let component: MallEditorPage;
  let fixture: ComponentFixture<MallEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MallEditorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MallEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
