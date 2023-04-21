import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { IField, IUser } from '../../model';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formName: string = 'Sign In';

  fields: IField[] = [
    {
      name: 'username',
      initialValue: null,
      validators: [Validators.required],
      type: 'text'
    },
    {
      name: 'password',
      initialValue: null,
      validators: [Validators.required],
      type: 'password'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  async getFormData(event: FormGroup) {
    const { username, password } = event.getRawValue();
    const user: IUser | undefined = await this.authService.login({ username, password });
    if (user) {
      this.router.navigateByUrl('dashboard');
    } else {
      this.toastr.error('User not found','Error');
    }
  }
}
