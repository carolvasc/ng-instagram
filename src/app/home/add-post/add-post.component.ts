import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { HomeService } from '../home.service';
import { ProgressService } from 'src/app/progress.service';

import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  
  image: any = null;
  email: string = null;
  percentage: number = 0;
  postProgress: string = 'pending';

  @Output() updateTimeline: Subject<any> = new Subject(); 

  get title() { return this.postForm.get('title').value; }

  constructor(private homeService: HomeService, private progressService: ProgressService) { }

  ngOnInit(): void {
    this.createForm();
    firebase.auth().onAuthStateChanged(user => {
      this.email = user.email
    });
  }

  createForm() {
    this.postForm = new FormGroup({
      'title': new FormControl(null),
    });
  }

  onSubmit() {
    this.homeService.createPost({ email: this.email, title: this.title, image: this.image[0] });

    let upload = interval(1500);

    let inProgress = new Subject();
    inProgress.next(true);

    upload
      .pipe(takeUntil(inProgress))
      .subscribe(() => {
        this.postProgress = 'progress';

        this.percentage = Math.round((this.progressService.state.bytesTransferred / this.progressService.state.totalBytes) * 100);

        if (this.progressService.status === 'done') {
          this.postProgress = 'done';
          this.updateTimeline.next();
          inProgress.next(false);
        }
      });
  }

  prepareImageUpload(event: Event) {
    this.image = (<HTMLInputElement>event.target).files;
  }

}
