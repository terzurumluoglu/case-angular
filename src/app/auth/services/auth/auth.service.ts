import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { IIdentity, IUser } from 'src/app/model';
import { IdentityService } from 'src/app/shared/services/identity/identity.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersPath: string = 'users.json';

  private userSubject$: BehaviorSubject<IIdentity> = new BehaviorSubject<IIdentity>(undefined);

  constructor(
    private router: Router,
    private http: HttpClient,
    private identityService: IdentityService
  ) { }

  public get userValue(): IIdentity {
    return this.userSubject$.value;
  }

  public getUserSubject() {
    return this.userSubject$.pipe(user => user);
  }

  public setUserSubject(val: IIdentity) {
    this.userSubject$.next(val);
  }

  async login(u: { username: string, password: string }): Promise<IIdentity> {
    const path: string = environment.apiUrl + this.usersPath;

    const users: any[] = await lastValueFrom(this.http.get<IUser[]>(path));
    const foundUser: any = users.find(user => user.username === u.username && user.password === u.password);
    if (!foundUser) {
      return undefined;
    }
    const {password, ...user} = foundUser;
    const identity: IIdentity = await this.identityService.getIdentityById(user.identityId);

    if (!identity) {
      return undefined;
    }
    identity.user = user;

    localStorage.setItem('identity', JSON.stringify(identity));
    this.setUserSubject(identity);
    return identity;

  }

  logout() {
    this.setUserSubject(undefined);
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
