import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router) { }

  ngOnInit(): void {
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit(values: AbstractControl): void {
    this.authService.login(values).subscribe(res => {
      if (res.status === 'failure') {
        console.log(res);
        // error message
      } else {
        this.authService.logged = true;
        this.sessionService.register(res.id, 'user_id');
        this.router.navigate(['todolist']);
      }
    });
  }

  get email(): AbstractControl { return this.credentials.get('email'); }
  get password(): AbstractControl { return this.credentials.get('password'); }

}
