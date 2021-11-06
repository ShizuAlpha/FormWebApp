import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserMod, UserSup } from 'app/model/user.model'
import { Form } from 'app/model/form.model';
import { Response } from 'app/model/response.model';
import { Reception } from 'app/model/reception.model';
import { InputModel, InputModelDTO } from 'app/model/input.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url: string = `${environment.apiBaseURL}users`;

  constructor(private http: HttpClient){}
  
  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this._url);
  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>(`${this._url}/${id}`)
  }

  updateUser(id: number, user: UserMod) : Observable<User>{
    return this.http.put<User>(`${this._url}/${id}`, user);
  }

  deleteUser(user: User): Observable<string>{
    return this.http.delete<string>( `${this._url}/${user.id}`);
  }

  getUserForms(id: number): Observable<Form[]> {
    return this.http.get<Form[]>(`${this._url}/${id}/forms`);
  }

  getUserResponses(id: number): Observable<Response[]> {
    return this.http.get<Response[]>(`${this._url}/${id}/responses`);
  }

  getUserReceptions(id: number): Observable<Reception[]> {
    return this.http.get<Reception[]>(`${this._url}/${id}/receptions`);
  }

  getUserInputs(id: number): Observable<InputModelDTO[]> {
    return this.http.get<InputModelDTO[]>(`${this._url}/${id}/inputs`);
  }
}
