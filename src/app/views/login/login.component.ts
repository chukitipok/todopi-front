import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { 
    this.credentials = formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {

  }

  onSubmit(values: AbstractControl ): void {
    this.authService.login(values).subscribe(e => console.log(e))
  }

}
