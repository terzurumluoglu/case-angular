import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  identity: any;
  tableKeys: string[];
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.identity = this.authService.userValue;
    const { id, contactId, user, ...data } = this.identity;
    this.tableKeys = Object.keys(data);
  }

}
