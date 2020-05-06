import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { User } from '../user.model';

import { AccessService } from '../access.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading: boolean = false;

  get email() { return this.registerForm.get('email').value };
  get name() { return this.registerForm.get('name').value };
  get userName() { return this.registerForm.get('userName').value };
  get password() { return this.registerForm.get('password').value };

  @Output() showRegister: Subject<boolean> = new Subject<boolean>();
  @Output() hasError: Subject<boolean> = new Subject<boolean>();
  user: User = new User();
  errorMessage: boolean = false;

  constructor(private accessService: AccessService) { }

  ngOnInit(): void {
    this.createForm();
  }

  showRegisterForm() {
    this.showRegister.next(false);
  }

  createForm() {
    this.registerForm = new FormGroup({
      'email': new FormControl(null),
      'name': new FormControl(null),
      'userName': new FormControl(null),
      'password': new FormControl(null),
    })
  }

  onSubmit() {
    this.loading = true;
    this.user = new User(this.email, this.name, this.userName, this.password);

    this.accessService.registerUser(this.user)
      .then((response) => {
        if(response !== false){
          this.showRegisterForm();
        } else {
          this.hasError.next();
          setTimeout(() => this.errorMessage = true, 700);
        }
        this.loading = false;
      });
  }

}
