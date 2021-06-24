import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {FirestoreService} from 'src/services/FirestoreService/firestore.service';
import {MallNavigatorService} from 'src/services/MallNavigatorService/mallNavigator.service';

import {MallDetails} from 'src/models/MallDetails';

@Component({
  selector: 'malls-grid',
  templateUrl: './malls-grid.page.html',
  styleUrls: ['./malls-grid.page.scss'],
})
export class MallsGridPage implements OnInit, OnDestroy {
  private mallsSub: Subscription;

  public mallGroups: MallDetails[][] = [];
  public mallsLoaded: boolean = false;

  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private mallNavigatorService: MallNavigatorService
  ) {}

  ngOnInit() {
    this.mallsSub = this.firestoreService.getMalls().subscribe((malls) => {
      this.mallGroups = this.getNChunks(malls, 2);
      this.mallsLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.mallsSub) {
      this.mallsSub.unsubscribe();
    }
  }

  goToMall(mall: MallDetails) {
    this.mallNavigatorService.setMall(mall);
    this.router.navigate(['/mall-container']);
  }

  getNChunks(array: any[], size: number) {
    var arrays = [];

    while (array.length > 0) {
      arrays.push(array.splice(0, size));
    }

    return arrays;
  }
}
