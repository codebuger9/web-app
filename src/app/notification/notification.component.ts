import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from 'src/services/AuthService/auth.service';
import {UserNavigatorService} from 'src/services/UserNavigatorService/userNavigator.service';
import {PostNavigatorService} from 'src/services/PostNavigatorService/postNavigator.service';
import {FirestoreService} from 'src/services/FirestoreService/firestore.service';

import {VisualNotification} from 'src/models/VisualNotification';
import {User} from 'src/models/User';
import {Post} from 'src/models/Post';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input() notification: VisualNotification;

  constructor(
    private router: Router,
    public authService: AuthService,
    private userNavigatorService: UserNavigatorService,
    private postNavigatorService: PostNavigatorService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {}

  goToUserProfile(user: User) {
    this.userNavigatorService.setUser(user);
    this.router.navigate(['/user-profile']);
  }

  goToPost(postId: string) {
    this.firestoreService.getPost(postId).then((post: Post) => {
      this.postNavigatorService.setPost(post);
      this.router.navigate(['/post-container']);
    });
  }
}
