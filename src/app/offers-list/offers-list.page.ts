import {Component, OnInit, OnDestroy} from '@angular/core';

import * as moment from 'moment';
import {Subscription} from 'rxjs';

import {FirestoreService} from 'src/services/FirestoreService/firestore.service';
import {AuthService} from 'src/services/AuthService/auth.service';
import {PostNavigatorService} from 'src/services/PostNavigatorService/postNavigator.service';

import {User} from 'src/models/User';
import {Post} from 'src/models/Post';
import {Offer} from 'src/models/Offer';
import {VisualOffer} from 'src/models/VisualOffer';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.page.html',
  styleUrls: ['./offers-list.page.scss'],
})
export class OffersListPage implements OnInit, OnDestroy {
  private offersSub: Subscription;

  public user: User;
  public post: Post;

  public offers: VisualOffer[] = [];
  public offersLoaded: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private postNavigatorService: PostNavigatorService
  ) {
    this.user = this.authService.user;
    this.post = this.postNavigatorService.getPost();
  }

  ngOnInit() {
    this.getPostOffers();
  }

  ngOnDestroy() {
    if (this.offersSub) {
      this.offersSub.unsubscribe();
    }
  }

  getPostOffers() {
    this.offersSub = this.firestoreService
      .getOffers(this.authService.user, this.post)
      .subscribe((offers) => {
        this.offers = <VisualOffer[]>this.offersToVisualOffers(<Offer[]>offers);
        this.offersLoaded = true;
      });
  }

  offersToVisualOffers(offers: Offer[]): VisualOffer[] {
    var visualOffers: VisualOffer[] = [];

    offers.forEach((offer) => {
      var visualOffer = <VisualOffer>Object.assign(offer);

      visualOffer.timeAgo = offer.dateCreated
        ? moment(offer.dateCreated.toDate()).fromNow()
        : 'Just now';

      visualOffers.push(visualOffer);
    });

    return visualOffers;
  }
}
