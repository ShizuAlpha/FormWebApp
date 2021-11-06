import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reception, ReceptionDTO } from 'app/model/reception.model';
import { User } from 'app/model/user.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {
  private _url: string = `${environment.apiBaseURL}receptions`;

  constructor(private http: HttpClient){}

  
  getAllReceptions(): Observable<Reception[]>{
    return this.http.get<Reception[]>(this._url);
  }

  getReception(id: number): Observable<Reception>{
    return this.http.get<Reception>(`${this._url}/${id}`)
  }

  // createReception(reception: Reception): Observable<Reception>{
  //   return this.http.post<Reception>(this._url, reception);
  // }

  createMultipleReceptions(receptions: ReceptionDTO[]): Observable<ReceptionDTO[]>{
    return this.http.post<ReceptionDTO[]>(this._url, receptions);
  }

  updateReception(id: number, reception: Reception) : Observable<Reception>{
    return this.http.put<Reception>(`${this._url}/${id}`, reception);
  }

  deleteReception(reception: Reception): Observable<string>{
    return this.http.delete<string>( `${this._url}/${reception.id}`);
  }

}
