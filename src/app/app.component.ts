import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-instagram';

  ngOnInit() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyBYCzo1kOyy_mqW_a-usKhgrHsh9ezPWss",
      authDomain: "ng-instagram-b742b.firebaseapp.com",
      databaseURL: "https://ng-instagram-b742b.firebaseio.com",
      projectId: "ng-instagram-b742b",
      storageBucket: "ng-instagram-b742b.appspot.com",
      messagingSenderId: "257353096204",
      appId: "1:257353096204:web:fb73acfbec20b4299fa229",
      measurementId: "G-WF2XD8G2BD"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}