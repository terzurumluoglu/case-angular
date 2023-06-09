import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { IField, IIdentity } from '../../model';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
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
      disabled: false,
      type: 'text'
    },
    {
      name: 'password',
      initialValue: null,
      validators: [Validators.required],
      disabled: false,
      type: 'password'
    }
  ];

  returnUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
    if (this.authService.userValue) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  async getFormData(event: FormGroup) {
    const { username, password } = event.getRawValue();
    const identity = await this.authService.login({ username, password });
    if (identity) {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.toastr.error('User not found','Error');
    }
  }
}
