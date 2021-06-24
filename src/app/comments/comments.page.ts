import {Component, OnInit, Input, OnDestroy} from '@angular/core';

import {ModalController} from '@ionic/angular';

import * as moment from 'moment';
import {Subscription} from 'rxjs';

import {AuthService} from 'src/services/AuthService/auth.service';
import {FirestoreService} from 'src/services/FirestoreService/firestore.service';

import {Post} from 'src/models/Post';
import {VisualComment} from 'src/models/VisualComment';
import {Comment} from 'src/models/Comment';
import {UserDetails} from 'src/models/UserDetails';
import {User} from 'src/models/User';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit, OnDestroy {
  @Input() post: Post;

  private commentsSub: Subscription;

  public user: UserDetails;
  public comments: VisualComment[] = [];
  public commentContent = '';
  public addingComment = false;
  public commentsLoaded = false;
  private commentIntervals: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.user = this.authService.user;

    this.commentsSub = this.firestoreService
      .getComments(this.post.id)
      .subscribe((comments) => {
        this.comments = this.commentsToVisualComments(comments);
        this.commentsLoaded = true;
      });
  }

  ngOnDestroy(): void {
    if (this.commentsSub) {
      this.commentsSub.unsubscribe();
    }

    // Make sure to clear all comment intervals
    this.commentIntervals.forEach((interval) => {
      if (interval) {
        clearInterval(interval);
      }
    });
  }

  commentsToVisualComments(comments: Comment[]): VisualComment[] {
    var visualComments: VisualComment[] = [];

    comments.forEach((comment) => {
      var visualComment = <VisualComment>Object.assign(comment);

      visualComment.timeAgo = this.getTimeAgo(comment);

      // Update comment time ago every 15 seconds
      var commentInterval = setInterval(() => {
        visualComment.timeAgo = this.getTimeAgo(comment);
      }, 15000);

      this.commentIntervals.push(commentInterval);

      visualComments.push(visualComment);
    });

    return visualComments;
  }

  getTimeAgo(comment: Comment) {
    return comment.dateCreated
      ? moment(comment.dateCreated.toDate()).fromNow()
      : 'Just now';
  }

  addComment() {
    if (this.commentContent === '' || this.addingComment) {
      return;
    }

    this.addingComment = true;

    var comment = <Comment>{
      user: <User>{
        id: this.user.id,
        name: this.user.name,
        pictureURL: this.user.pictureURL,
      },
      content: this.commentContent,
    };

    this.firestoreService.addComment(this.post.id, comment).then(() => {
      this.commentContent = '';
      this.addingComment = false;
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
