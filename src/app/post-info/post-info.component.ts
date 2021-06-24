import {Component, OnInit, Input} from '@angular/core';

import {VisualPost} from 'src/models/VisualPost';

@Component({
  selector: 'post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss'],
})
export class PostInfoComponent implements OnInit {
  @Input() post: VisualPost;

  constructor() {}

  ngOnInit() {}
}
