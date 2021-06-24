import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostCreatorTwoPage } from './post-creator-two.page';

describe('PostCreatorTwoPage', () => {
  let component: PostCreatorTwoPage;
  let fixture: ComponentFixture<PostCreatorTwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCreatorTwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostCreatorTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
