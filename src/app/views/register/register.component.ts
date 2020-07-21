import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerInfo: FormGroup;

  ValidateEmail(control: AbstractControl): ValidationErrors | null {
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegExp.test(control.value) || control.value.length > 256) {
      return { validEmail: true };
    }

    return null;
  }


  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router) {
    this.registerInfo = formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required, this.ValidateEmail]],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  onSubmit(values: AbstractControl): void {
    this.authService.register(values).subscribe(res => {
      if (res.status === 'failure') {
        console.log(res);
        // error message
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  get email() { return this.registerInfo.get('email'); }
  get password() { return this.registerInfo.get('password'); }
  get lastname() { return this.registerInfo.get('lastname'); }
  get firstname() { return this.registerInfo.get('firstname'); }
  get birthdate() { return this.registerInfo.get('birthdate'); }


}
