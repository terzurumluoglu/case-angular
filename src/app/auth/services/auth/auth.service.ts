import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, find, lastValueFrom, map } from 'rxjs';
import { IUser } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject$: BehaviorSubject<IUser | undefined> = new BehaviorSubject<IUser | undefined>(undefined);

  constructor(private http: HttpClient) { }

  public get userValue(): IUser | undefined {
    return this.userSubject$.value;
  }

  async login(u: { username: string, password: string }): Promise<IUser | undefined> {
    return await lastValueFrom(
      this.http.get<IUser[]>('assets/mock/users.json').pipe(
        map((users: IUser[]) => {
          const user: IUser | undefined = users.find(user => user.username === u.username && user.password === u.password);
          if (user) {
            this.userSubject$.next(user);
            localStorage.setItem('user',JSON.stringify(user));
          }
          return user;
        })
      )
    );
  }
}
