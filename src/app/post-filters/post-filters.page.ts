import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-post-filters',
  templateUrl: './post-filters.page.html',
  styleUrls: ['./post-filters.page.scss'],
})
export class PostFiltersPage implements OnInit, OnDestroy {
  selectedPicture: string;
  selectedFilter: string;
  routeSub: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.selectedPicture = params['id'];
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  clearFilter() {
    this.selectedFilter = '';

    const mainPicture = document.getElementById('main-picture');

    if (mainPicture) {
      mainPicture.className = '';
    }
  }

  selectFilter(filter: string) {
    this.selectedFilter = filter;

    const mainPicture = document.getElementById('main-picture');

    if (mainPicture) {
      mainPicture.className = filter;
    }

    this.clearSelected();
    this.setSelected(filter);
  }

  clearSelected() {
    const filterNames = document.getElementsByClassName('filter-name');

    if (filterNames) {
      for (let i = 0; i < filterNames.length; i++) {
        filterNames[i].className = 'filter-name';
      }
    }
  }

  setSelected(filter: string) {
    const mainPicture = document.getElementById(filter);

    if (mainPicture) {
      mainPicture.classList.add('bold');
    }
  }

  next() {
    this.router.navigate(['/post-share'], {
      queryParams: {
        pictureUrl: this.selectedPicture,
        filter: this.selectedFilter,
      },
    });
  }
}
