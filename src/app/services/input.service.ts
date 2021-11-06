import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InputModel, InputModelDTO } from 'app/model/input.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputService {
  private _url: string = `${environment.apiBaseURL}inputs`;

  constructor(private http: HttpClient){}
  
  getAllInputs(): Observable<InputModel[]>{
    return this.http.get<InputModel[]>(this._url);
  }

  getInput(id: number): Observable<InputModel>{
    return this.http.get<InputModel>(`${this._url}/${id}`)
  }

  createInput(input: InputModelDTO): Observable<InputModel>{
    return this.http.post<InputModel>(this._url, input);
  }

  updateInput(id: number, input: InputModelDTO) : Observable<InputModelDTO>{
    return this.http.put<InputModelDTO>(`${this._url}/${id}`, input);
  }

  deleteInput(input: InputModel): Observable<string>{
    return this.http.delete<string>( `${this._url}/${input.id}`);
  }

}
