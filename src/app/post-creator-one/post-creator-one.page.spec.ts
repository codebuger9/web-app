import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostCreatorOnePage } from './post-creator-one.page';

describe('PostCreatorOnePage', () => {
  let component: PostCreatorOnePage;
  let fixture: ComponentFixture<PostCreatorOnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCreatorOnePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostCreatorOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
