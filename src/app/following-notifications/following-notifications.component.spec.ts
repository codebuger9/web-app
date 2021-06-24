import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingNotificationsComponent } from './following-notifications.component';

describe('FollowingNotificationsComponent', () => {
  let component: FollowingNotificationsComponent;
  let fixture: ComponentFixture<FollowingNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
