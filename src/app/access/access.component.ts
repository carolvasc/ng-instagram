import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css'],
  animations: [
    trigger('banner-animation', [
      state('created', style({ opacity: 1 })),
      transition('void => created', [
        style({ opacity: 0, transform: 'translate(-50px, 0)' }),
        animate('500ms 0s ease-in-out') // duração, delay e aceleração
      ])
    ]),
    trigger('panel-animation', [
      state('created', style({ opacity: 1 })),
      transition('void => created', [
        style({ opacity: 0, transform: 'translate(50px, 0)' }),
        animate('500ms 0s ease-in-out') // duração, delay e aceleração
      ])
    ])
  ]
})
export class AccessComponent implements OnInit {

  bannerState: string = 'created';
  panelState: string = 'created';

  register: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showRegisterForm(event: boolean) {
    this.register = event;
  }

}
