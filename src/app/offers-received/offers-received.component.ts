import {Component, OnInit} from '@angular/core';

import {FirestoreService} from 'src/services/FirestoreService/firestore.service';
import {AuthService} from 'src/services/AuthService/auth.service';

import {Post} from 'src/models/Post';

@Component({
  selector: 'offers-received',
  templateUrl: './offers-received.component.html',
  styleUrls: ['./offers-received.component.scss'],
})
export class OffersReceivedComponent implements OnInit {
  public posts: Post[] = [];
  public postsLoaded: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getUserPostsWithOffers();
  }

  getUserPostsWithOffers() {
    this.firestoreService
      .getUserPostsWithOffers(this.authService.user.id)
      .then((posts) => {
        this.posts = <Post[]>posts;
        this.postsLoaded = true;
      });
  }
}
