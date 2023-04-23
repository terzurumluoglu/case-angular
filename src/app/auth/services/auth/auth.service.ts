import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IIdentity } from 'src/app/model';
import { StateService } from 'src/app/shared/services/state/state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject$: BehaviorSubject<IIdentity> = new BehaviorSubject<IIdentity>(undefined);

  constructor(
    private router: Router,
    private stateService: StateService
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

    const foundUser: any = (this.stateService.users$.value as any[])
      .find(user =>
        user.username === u.username &&
        user.password === u.password);

    if (!foundUser) {
      return undefined;
    }
    const { password, ...user } = foundUser;

    const identity: IIdentity = this.stateService.identity$.value.find(identity => identity.id === user.identityId);

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
