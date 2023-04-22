import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { IIdentity } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  identityPath: string = 'identity.json';

  constructor(
    private http: HttpClient
  ) {
    this.identityPath = environment.apiUrl + this.identityPath;
  }

  getAllIdentities() {
    return lastValueFrom(this.http.get(this.identityPath));
  }

  getIdentityById(id: number): Promise<IIdentity> {
    return lastValueFrom(this.http.get<IIdentity[]>(this.identityPath).pipe(
      map((identities: IIdentity[]) => {
        return identities.find(identity => identity.id === id);
      })
    ));
  }

}
