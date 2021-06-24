import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsSliderComponent } from './posts-slider.component';

describe('PostsSliderComponent', () => {
  let component: PostsSliderComponent;
  let fixture: ComponentFixture<PostsSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
