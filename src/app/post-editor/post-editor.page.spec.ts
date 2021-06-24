import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditorPage } from './post-editor.page';

describe('PostEditorPage', () => {
  let component: PostEditorPage;
  let fixture: ComponentFixture<PostEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostEditorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
