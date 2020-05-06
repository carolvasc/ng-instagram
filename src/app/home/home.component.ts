import { Component, OnInit, ViewChild } from '@angular/core';
import { AccessService } from '../access/access.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('postsComponent') posts;

  constructor(private accessService: AccessService) { }

  ngOnInit(): void {
  }

  logout() {
    this.accessService.logout();
  }

  updateTimeline() {
    this.posts.reloadTimeline();
  }

}
