import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { IIdentity } from 'src/app/model';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  identity?: IIdentity;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.identity = this.authService.userValue;
  }

  logout() {
    this.authService.logout()
  }

}
