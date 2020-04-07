import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HomeService } from '../home.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  get title() { return this.postForm.get('title').value; }

  email: string = null;

  constructor(private homeService: HomeService) { }

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
    this.homeService.createPost({ email: this.email, title: this.title });
  }

}
