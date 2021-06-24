import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSharePage } from './post-share.page';

describe('PostSharePage', () => {
  let component: PostSharePage;
  let fixture: ComponentFixture<PostSharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSharePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
