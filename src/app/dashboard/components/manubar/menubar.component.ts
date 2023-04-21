import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { IIdentity } from 'src/app/model';
import { ACCOUNT_MENUS, MENUS } from './menubar.mock';

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
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.identity = this.authService.userValue;
    this.accountMenus.name = this.accountMenus.name.split('{{USER}}').join(`${this.identity?.name} ${this.identity?.surname}`);
    this.accountMenus.subMenus.forEach((subMenu: any) => {
      if (subMenu.name === 'logout') {
        subMenu.fn = () => {
          this.logout();
        }
      }
    });
  }

  logout() {
    this.authService.logout()
  }

}
