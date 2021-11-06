import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserSup } from 'app/model/user.model';
import { environment } from 'environments/environment';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private _url: string = `http://localhost:8080`;
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  
  constructor(private httpclient: HttpClient,
    private local: LocalStorageService) { }

  public login(loginData: any) {
    return this.httpclient.post(this._url + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }
  
  public createUser(user: UserSup): Observable<User>{
    return this.httpclient.post<User>(this._url + '/api/users/registerNewUser', user, {
      headers: this.requestHeader,
    });
  }

  public roleMatch(allowedRoles: string[] | any[]): any {
    let isMatch = false;
    const userRoles: any = this.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        allowedRoles.forEach(element => {
          if (userRoles[i].name === element) {
            isMatch = true;
          } else {
          }
        });
      }
    }
    return isMatch;
  }

  public setRoles(roles: []) {
    this.local.store('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(this.local.retrieve('roles')!);
  }

  public setToken(jwtToken: string) {
    this.local.store('jwtToken', jwtToken);
  }

  public getToken(): string {
    return this.local.retrieve('jwtToken')!;
  }

  public setUser(user: User) {
    this.local.store('user', JSON.stringify(user));
  }

  public getUser(): string {
    return JSON.parse(this.local.retrieve('user')!);
  }

  public clear() {
    this.local.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}
