import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'app/model/user.model';
import { UserAuthService } from 'app/services/user-auth.service';
import { UserService } from 'app/services/user.service';
import { LocalStorageService } from 'ngx-webstorage';
import { ModUserComponent } from './mod-user/mod-user.component';

@Component({
  selector: 'app-page-user-manager',
  templateUrl: './page-user-manager.component.html',
  styleUrls: ['./page-user-manager.component.css']
})
export class PageUserManagerComponent implements OnInit {

  users!: User[];
  public show = true;

  constructor(private userService: UserService,
    private userAuthService: UserAuthService, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }

  modifyUser(user: User): void{
    console.log(user);
    const dialog = this.dialog.open(ModUserComponent , {
      data: { user },
    });
    dialog.afterClosed().subscribe(() => {
      this.getAllUsers();
      this.reload();
  });
  }

  getAllUsers(): void {
    this.users = [];
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log(this.users)
        for (let i = 0; i < this.users.length; i++) {
          console.log(this.users[i])
          if (this.users[i].id == 1) {
            console.log(this.users[i])
            this.users.splice(i,1);
          }
        }
      }
    );
  }

}
