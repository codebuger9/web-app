import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserPacksComponent } from './user-packs.component';

describe('UserPacksComponent', () => {
  let component: UserPacksComponent;
  let fixture: ComponentFixture<UserPacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPacksComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserPacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
