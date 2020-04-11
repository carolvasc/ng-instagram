import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { AccessService } from '../access.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  @Output() showRegister: Subject<boolean> = new Subject<boolean>();
  @Output() hasError: Subject<boolean> = new Subject<boolean>();

  errorMessage: boolean = false;

  constructor(private accessService: AccessService) { }

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
    const { email, password } = this.loginForm.value;

    this.accessService.login(email, password)
      .then(response => {
        if (response === false)
          this.hasError.next();

          setTimeout(() => this.errorMessage = true, 700);
      });
  }

}
