import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user.model';
import { UserService } from 'app/services/user.service';
import { LocalStorageService } from 'ngx-webstorage';
import {Router} from '@angular/router';
import { UserAuthService } from 'app/services/user-auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public userAuthService: UserAuthService) { }

  ngOnInit(): void {
  }

  isLoggedin(){
    return this.userAuthService.isLoggedIn();
  }

  logout(){
    this.userAuthService.clear();
    location.reload();    
  }

}
