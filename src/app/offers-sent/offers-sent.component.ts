import {Component, OnInit, OnDestroy} from '@angular/core';

import * as moment from 'moment';
import {Subscription} from 'rxjs';

import {FirestoreService} from 'src/services/FirestoreService/firestore.service';
import {AuthService} from 'src/services/AuthService/auth.service';

import {OfferSent} from 'src/models/OfferSent';

@Component({
  selector: 'offers-sent',
  templateUrl: './offers-sent.component.html',
  styleUrls: ['./offers-sent.component.scss'],
})
export class OffersSentComponent implements OnInit, OnDestroy {
  private offersSentSub: Subscription;

  public offersSent: OfferSent[] = [];
  public offersSentLoaded: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getUserPostsWithOffers();
  }

  ngOnDestroy() {
    if (this.offersSentSub) {
      this.offersSentSub.unsubscribe();
    }
  }

  getUserPostsWithOffers() {
    this.offersSentSub = this.firestoreService
      .getOffersSent(this.authService.user)
      .subscribe((offersSent) => {
        this.offersSent = <OfferSent[]>offersSent;

        this.offersSent.forEach((offerSent) => {
          offerSent.offer.timeAgo = offerSent.offer.dateCreated
            ? moment(offerSent.offer.dateCreated.toDate()).fromNow()
            : 'Just now';
        });

        this.offersSentLoaded = true;
      });
  }
}
