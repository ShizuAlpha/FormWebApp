import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form, FormDTO } from 'app/model/form.model';
import { Response } from 'app/model/response.model';
import { Reception } from 'app/model/reception.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private _url: string = `${environment.apiBaseURL}forms`;

  constructor(private http: HttpClient){}

  getAllForms(): Observable<Form[]>{
    return this.http.get<Form[]>(this._url);
  }

  getForm(id: number): Observable<Form>{
    return this.http.get<Form>(`${this._url}/${id}`)
  }

  createForm(form: FormDTO): Observable<FormDTO>{
    return this.http.post<FormDTO>(this._url, form);
  }

  updateForm(id: number, form: Form) : Observable<Form>{
    return this.http.put<Form>(`${this._url}/${id}`, form);
  }

  deleteForm(form: Form): Observable<string>{
    return this.http.delete<string>( `${this._url}/${form.id}`);
  }

  getFormResponses(id: number): Observable<Response[]> {
    return this.http.get<Response[]>(`${this._url}/${id}/responses`);
  }

  getFormReceptions(id: number): Observable<Reception[]> {
    return this.http.get<Reception[]>(`${this._url}/${id}/receptions`);
  }

  getFormReceptionsByUser(id: number): Observable<Form[]> {
    return this.http.get<Form[]>(`${this._url}/${id}/filteredReceptions`);
  }

  exportToExcel(id: number): Observable<Blob> {
    return this.http.get(`${this._url}/${id}/excel`, { responseType: 'blob' });
  }
}
