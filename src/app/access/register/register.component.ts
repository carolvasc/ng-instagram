import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() showRegister: Subject<boolean> = new Subject<boolean>();

  registerForm: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'name': new FormControl(null),
    'user': new FormControl(null),
    'password': new FormControl(null),
  })

  constructor() { }

  ngOnInit(): void {
  }

  showRegisterForm() {
    this.showRegister.next(false);
  }

  onSubmit() {
    
  }

}
