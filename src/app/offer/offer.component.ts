import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

import * as moment from 'moment';

import {AuthService} from 'src/services/AuthService/auth.service';
import {PostNavigatorService} from 'src/services/PostNavigatorService/postNavigator.service';

import {Post} from 'src/models/Post';
import {User} from 'src/models/User';

@Component({
  selector: 'offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  @Input() post: Post;

  public user: User;
  public offerTimeAgo: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private postNavigatorService: PostNavigatorService
  ) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    this.offerTimeAgo = this.post.lastOffer.dateCreated
      ? moment(this.post.lastOffer.dateCreated.toDate()).fromNow()
      : 'Just now';
  }

  goToOffersList() {
    this.postNavigatorService.setPost(this.post);
    this.router.navigateByUrl('offers-list');
  }
}
