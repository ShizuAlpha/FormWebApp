import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reception } from 'app/model/reception.model';
import { Response, ResponseDTO } from 'app/model/response.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private _url: string = `${environment.apiBaseURL}responses`;

  constructor(private http: HttpClient){}

  getAllResponses(): Observable<Response[]>{
    return this.http.get<Response[]>(this._url);
  }

  getResponse(id: number): Observable<Response>{
    return this.http.get<Response>(`${this._url}/${id}`)
  }

  getReceptionResponse(id: number): Observable<Response>{
    return this.http.get<Response>(`${this._url}/${id}/receptionResponce`);
  }

  createResponse(response: ResponseDTO): Observable<Response>{
    return this.http.post<Response>(this._url, response);
  }

  updateResponse(id: number, response: Response) : Observable<Response>{
    return this.http.put<Response>(`${this._url}/${id}`, response);
  }

  deleteResponse(response: Response): Observable<string>{
    return this.http.delete<string>( `${this._url}/${response.id}`);
  }

}
