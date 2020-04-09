import { Component, OnInit } from '@angular/core';

import { HomeService } from '../home.service';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  email: string = null;
  posts = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(user => {
      this.email = user.email;

      this.reloadTimeline();
    });
  }

  /** Atualiza a timeline */
  reloadTimeline() {
    this.homeService.getPosts(this.email)
      .then(response => this.posts = response as []);
  }

}
