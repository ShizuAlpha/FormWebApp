import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, Role, UserMod } from 'app/model/user.model';
import { UserService } from 'app/services/user.service';

@Component({
  templateUrl: './mod-user.component.html',
  styleUrls: ['./mod-user.component.css']
})
export class ModUserComponent implements OnInit {

  roles: string[] = ['ADMIN', 'FORM_CREATOR', 'FORM_READER'];
  selectedRoles!: string[];
  modUser!: UserMod;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: User},
  private userService: UserService,
  private dialogRef: MatDialogRef<ModUserComponent>
  ) {
    this.modUser = {id: this.data.user.id,
      username: this.data.user.username,
      firstName: this.data.user.firstName,
      lastName: this.data.user.lastName,
      email: this.data.user.email,
      terminal: this.data.user.terminal,
      roles: []}
   }

  ngOnInit(): void {
    console.log(this.data.user);
    this.loadRoles();
  }

  loadRoles():void {
    this.selectedRoles = [];
    this.roles.forEach(role => {
      this.data.user.roles.forEach((element: any) => {
        console.log(element)
        if (role === element.name) {
          this.selectedRoles.push(role);
        }
      });
    });
  }

  modify(): void{
    this.modUser.roles = this.selectedRoles;
    console.log(this.modUser)
    this.userService.updateUser(this.data.user.id!, this.modUser).subscribe(
      (response: User) =>{
        console.log(response)
      }
    )
    this.dialogRef.close();
  }

}

