import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class CopyFormService {

  private message: string = "[]";

  constructor(private localStorage: LocalStorageService) { }

  setMessage(mess: string): void{
    this.message = mess;
    this.localStorage.store('message', this.message);
  }

  getMessage(): string{
    this.message = this.localStorage.retrieve('message')
    this.localStorage.clear('message')
    return this.message;
  }
}
