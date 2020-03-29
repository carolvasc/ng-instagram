import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Image } from './image.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('hide', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hide <=> show', animate('1s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  estado: string = 'show';

  images = [
    { state: 'show', url: '/assets/banner-access/img_1.png' },
    { state: 'hide', url: '/assets/banner-access/img_2.png' },
    { state: 'hide', url: '/assets/banner-access/img_3.png' },
    { state: 'hide', url: '/assets/banner-access/img_4.png' },
    { state: 'hide', url: '/assets/banner-access/img_5.png' }
  ]

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.rotateImages(), 2000);
  }

  rotateImages() {
    let nextPosition = 0;

    for (let i = 0; i <= this.images.length; i++) {
      if (this.images[i].state === 'show') {
        this.images[i].state = 'hide';

        nextPosition = i === 4 ? 0 : i + 1;

        break;
      }
    }

    this.images[nextPosition].state = 'show';

    setTimeout(() => this.rotateImages(), 2000);
  }

}
