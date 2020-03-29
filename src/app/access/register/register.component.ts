import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() showRegister: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  showRegisterForm() {
    this.showRegister.next(false);
  }

}
