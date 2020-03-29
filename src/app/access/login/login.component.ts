import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() showRegister: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  showRegisterForm() {
    this.showRegister.next(true);
  }

}
