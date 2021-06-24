import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

import {Post} from 'src/models/Post';
import {User} from 'src/models/User';
import {VisualNotification} from 'src/models/VisualNotification';

@Component({
  selector: 'notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  @Input() title: string;
  @Input() notifications: VisualNotification[] = [];

  constructor(private router: Router) {}

  ngOnInit() {}

  goToProfile(user: User) {
    this.router.navigate(['/profile', user.id]);
  }

  goToPost(post: Post) {
    this.router.navigate(['/post-container', post.id]);
  }
}
