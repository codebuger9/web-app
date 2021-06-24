import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

import {Subscription} from 'rxjs';

import {FirestoreService} from 'src/services/FirestoreService/firestore.service';

import {Discussion} from 'src/models/Discussion';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  private userSub: Subscription;
  private unreadDiscussionsSub: Subscription;

  public type = 'products';
  public unreadDiscussionsCount: number = 0;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.userSub = this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.unreadDiscussionsSub = this.firestoreService
          .getUnreadDiscussions(user.uid)
          .subscribe((unreadDiscussions: Discussion[]) => {
            this.unreadDiscussionsCount = unreadDiscussions.length;
          });
      }
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }

    if (this.unreadDiscussionsSub) {
      this.unreadDiscussionsSub.unsubscribe();
    }
  }

  openShowAndMalls() {
    this.router.navigateByUrl('shops-malls');
  }

  openDiscussions() {
    this.router.navigateByUrl('discussions');
  }
}
