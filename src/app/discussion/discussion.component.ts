import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from 'src/services/AuthService/auth.service';

import {Discussion} from 'src/models/Discussion';
import {User} from 'src/models/User';

@Component({
  selector: 'discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
})
export class DiscussionComponent implements OnInit {
  @Input() discussion: Discussion;

  public user: User;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.user =
      this.authService.user.id !== this.discussion.user1.id
        ? this.discussion.user1
        : this.discussion.user2;
  }

  navigateToMessages() {
    this.router.navigate(['/messages', this.discussion.id]);
  }
}
