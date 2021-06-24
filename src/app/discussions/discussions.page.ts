import {Component, OnInit, OnDestroy} from '@angular/core';

import * as moment from 'moment';
import {Subscription} from 'rxjs';

import {AuthService} from 'src/services/AuthService/auth.service';
import {FirestoreService} from 'src/services/FirestoreService/firestore.service';

import {Discussion} from 'src/models/Discussion';
import {VisualDiscussion} from 'src/models/VisualDiscussion';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.page.html',
  styleUrls: ['./discussions.page.scss'],
})
export class DiscussionsPage implements OnInit, OnDestroy {
  private discussionsSub: Subscription;

  public discussions: Discussion[] = [];
  public discussionsLoaded = false;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.discussionsSub = this.firestoreService
      .getBusinessDiscussions(this.authService.user)
      .subscribe((discussions: Discussion[]) => {
        this.discussions = this.discussionsToVisualDiscussions(discussions);
        this.discussionsLoaded = true;
      });
  }

  ngOnDestroy() {
    if (this.discussionsSub) {
      this.discussionsSub.unsubscribe();
    }
  }

  discussionsToVisualDiscussions(
    discussions: Discussion[]
  ): VisualDiscussion[] {
    var visualDiscussions: VisualDiscussion[] = [];

    discussions.forEach((discussion) => {
      var visualDiscussion = <VisualDiscussion>Object.assign(discussion);

      if (discussion.lastMessage) {
        visualDiscussion.timeAgo = discussion.lastMessage.dateCreated
          ? moment(discussion.lastMessage.dateCreated.toDate()).fromNow()
          : 'Just now';
      }

      visualDiscussions.push(visualDiscussion);
    });

    return visualDiscussions;
  }
}
