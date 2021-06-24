import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {OffersSentComponent} from './offers-sent.component';

describe('OffersSentComponent', () => {
  let component: OffersSentComponent;
  let fixture: ComponentFixture<OffersSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OffersSentComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(OffersSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
