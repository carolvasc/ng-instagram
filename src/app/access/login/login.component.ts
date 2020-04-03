import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  get email() { return this.loginForm.get('email').value };
  get password() { return this.loginForm.get('password').value };

  @Output() showRegister: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    })
  }

  showRegisterForm() {
    this.showRegister.next(true);
  }

  onSubmit() {
    console.log(this.loginForm.value)
  }

}
