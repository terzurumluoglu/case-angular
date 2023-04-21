import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'case-angular';

  constructor(private auth: AuthService) {
    let identity = localStorage.getItem('identity');
    if (!!identity && !auth.userValue) {
      auth.userSubject$.next(JSON.parse(identity)); 
    }
  }
}
