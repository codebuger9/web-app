import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFiltersPage } from './post-filters.page';

describe('PostFiltersPage', () => {
  let component: PostFiltersPage;
  let fixture: ComponentFixture<PostFiltersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFiltersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFiltersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
