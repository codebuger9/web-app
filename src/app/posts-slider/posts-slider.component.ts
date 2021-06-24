import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

import * as moment from 'moment';
import {Subscription} from 'rxjs';

import {AuthService} from 'src/services/AuthService/auth.service';
import {FirestoreService} from 'src/services/FirestoreService/firestore.service';

import {Enums} from 'src/models/Enums';
import {Post} from 'src/models/Post';
import {VisualPost} from 'src/models/VisualPost';
import {UserDetails} from 'src/models/UserDetails';

@Component({
  selector: 'posts-slider',
  templateUrl: './posts-slider.component.html',
  styleUrls: ['./posts-slider.component.scss'],
})
export class PostsSliderComponent implements OnInit, OnDestroy {
  @Input() postType: Enums.PostType;
  @Input() isProfile: boolean;
  @Input() user: UserDetails;

  private userSub: Subscription;
  private productsSub: Subscription;
  private servicesSub: Subscription;
  private requestsSub: Subscription;
  private userPostsSub: Subscription;

  public posts: VisualPost[] = [];
  public postsLoaded: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    // make sure user is authenticated
    this.userSub = this.afAuth.authState.subscribe((user: firebase.User) => {
      if (this.postType !== undefined) {
        this.getHomePosts();
      } else if (this.user) {
        this.getUserPosts();
      }
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }

    if (this.productsSub) {
      this.productsSub.unsubscribe();
    }

    if (this.servicesSub) {
      this.servicesSub.unsubscribe();
    }

    if (this.requestsSub) {
      this.requestsSub.unsubscribe();
    }

    if (this.userPostsSub) {
      this.userPostsSub.unsubscribe();
    }
  }

  getHomePosts() {
    switch (this.postType) {
      case Enums.PostType.Product: {
        this.productsSub = this.firestoreService
          .getProducts()
          .subscribe((products) => {
            this.posts = this.postToVisualPost(products);
            this.postsLoaded = true;
          });

        break;
      }

      case Enums.PostType.Service: {
        this.servicesSub = this.firestoreService
          .getServices()
          .subscribe((services) => {
            this.posts = this.postToVisualPost(services);
            this.postsLoaded = true;
          });

        break;
      }

      case Enums.PostType.Request: {
        this.requestsSub = this.firestoreService
          .getRequests()
          .subscribe((requests) => {
            this.posts = this.postToVisualPost(requests);
            this.postsLoaded = true;
          });

        break;
      }
    }
  }

  getUserPosts() {
    this.userPostsSub = this.firestoreService
      .getUserPosts(this.user.id)
      .subscribe((userPosts) => {
        this.posts = this.postToVisualPost(userPosts);
        this.postsLoaded = true;
      });
  }

  postToVisualPost(posts: Post[]): VisualPost[] {
    var visualPosts: VisualPost[] = [];

    posts.forEach((post) => {
      var visualPost = <VisualPost>Object.assign(post);

      visualPost.isLiked = false;
      visualPost.pictureIndex = 1;
      visualPost.timeAgo = post.dateCreated
        ? moment(post.dateCreated.toDate()).fromNow()
        : 'Just now';

      if (post.user.location) {
        var postLocation = post.user.location;
        var currentUserLocation = this.authService.user.location;

        visualPost.distance = parseInt(
          this.calculateDistance(
            postLocation.latitude,
            postLocation.longitude,
            currentUserLocation.latitude,
            currentUserLocation.longitude,
            'K'
          ).toString()
        );
      }

      visualPosts.push(visualPost);
    });

    return visualPosts;
  }

  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit: string
  ): number {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;

      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;

      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

      if (dist > 1) {
        dist = 1;
      }

      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;

      if (unit == 'K') {
        dist = dist * 1.609344;
      }

      if (unit == 'N') {
        dist = dist * 0.8684;
      }

      return dist;
    }
  }
}
