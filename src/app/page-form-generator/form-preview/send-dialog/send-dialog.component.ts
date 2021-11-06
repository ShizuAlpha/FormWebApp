import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'app/model/user.model';
import { UserService } from 'app/services/user.service';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Reception } from 'app/model/reception.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-send-dialog',
  templateUrl: './send-dialog.component.html',
  styleUrls: ['./send-dialog.component.css']
})
export class SendDialogComponent implements OnInit {

  users!: User[];

  receptions!: Reception[];

  formGroup!: FormGroup;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { formId: number }) {
    this.formGroup = this.formBuilder.group({})
   }

  ngOnInit(): void {
    this.getAllUsers();
  }

  send(): void{
    
  }

  getAllUsers(): void {
    this.users = [];
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.users.forEach(user => {
          const key: string = user.id!.toString();
          this.formGroup = this.formBuilder.group({key : false})
        });
        console.log(this.formGroup.value)
        console.log(this.data.formId)
      }
    );
  }

}
