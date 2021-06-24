import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';

import {VisualPost} from 'src/models/VisualPost';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @ViewChild('card', {
    read: ElementRef,
    static: true,
  })
  public card: ElementRef;
  
  @Input() post: VisualPost;
  @Input() isProfile: boolean;

  constructor() {}

  ngOnInit() {}
}
