import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { IIdentity } from 'src/app/model';
import { ACCOUNT_MENUS, MENUS } from './menubar.mock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  identity?: IIdentity;
  menus: any[] = MENUS;
  accountMenus: any = ACCOUNT_MENUS;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  fn(subMenu: any) {
    if (subMenu.route) {
      const path: string = this.router.url + '/' + subMenu.route;
      this.router.navigateByUrl(path);
    } else {
      this.logout();
    }
  }

  ngOnInit(): void {
    this.identity = this.authService.userValue;
    this.accountMenus.name = this.accountMenus.name.split('{{USER}}').join(`${this.identity?.name} ${this.identity?.surname}`);
  }

  logout() {
    this.authService.logout()
  }

}
