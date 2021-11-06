import { Direction } from '@angular/cdk/bidi/directionality';
import { Component, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { InputModel} from 'app/model/input.model';
import { Form, FormDTO } from 'app/model/form.model';
import { FormService } from 'app/services/form.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { MatDialog } from '@angular/material/dialog';
import { SendDialogComponent } from './send-dialog/send-dialog.component';
import { User } from 'app/model/user.model';
import { Reception, ReceptionDTO } from 'app/model/reception.model';
import { UserService } from 'app/services/user.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ReceptionService } from 'app/services/reception.service';


@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css']
})
export class FormPreviewComponent implements OnInit {

  @Input() formElementString!: string;
  
  formAlignment: Direction = "ltr";
  formPreview!: InputModel[];
  formTitle: string = "Titre du formulaire";
  form: FormDTO = {name: "test", date: new Date, formString: "", orientation: false, user: +JSON.parse(this.localStorage.retrieve('user')).id};
  formId!:  number;

  users!: User[];
  receptions: ReceptionDTO[] = [];
  newReceptions: ReceptionDTO[] = [];
  noUsers: boolean = false;
  
  constructor(private userService: UserService,
    private formService: FormService,
    private receptionService: ReceptionService,
    private localStorage: LocalStorageService,
    public dialog: MatDialog) { 
      this.form.user = +JSON.parse(this.localStorage.retrieve('user')).id;
      console.log(this.form)
      console.log(this.form.user)
      console.log(JSON.parse(this.localStorage.retrieve('user')).id)
    }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.decodeFormString();
    this.form.formString = this.formElementString;
    this.formId = -1;
  }

  sendForm(templateRef: TemplateRef<any>): void{
    if(this.formId == undefined || this.formId == -1){
      this.saveForm()
    }
    this.getAllUsers();
    this.dialog.open(templateRef);
  }

  decodeFormString(): void{
    if (this.formElementString != '') {
      this.formPreview = JSON.parse(this.formElementString); 
    }
  }

  saveForm(): void{
    if (this.form.formString == "" || this.form.formString == "[]") {
      console.log("empty form")
      return;
    }

    this.form.name = this.formTitle;
    if (this.formAlignment == "ltr") {
      this.form.orientation = false;
    }else {
      this.form.orientation = true;
    }
    this.form.user = +JSON.parse(this.localStorage.retrieve('user')).id;
    this.formService.createForm(this.form).subscribe(
      (request: FormDTO) => {
        this.formId = request.id!;
        console.log("saved")
        console.log(request)
        console.log(this.form)
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  send(): void{
    console.log(this.receptions);
    this.receptionService.createMultipleReceptions(this.receptions).subscribe(
      (request: ReceptionDTO[]) =>{
        console.log("saved");
        console.log(request);
        this.receptions = [];
        return String;
      }
    )
    this.dialog.closeAll();
  }

  showOptions(event:MatCheckboxChange, user: User): void {
    console.log(event.checked);
    if (event.checked) {
      this.receptions.push({dateReception: new Date, status: 0, form: this.formId, user: user.id})
    }
    else{
      this.receptions.forEach(element => {
        if (element.user == user.id) {
          const index = this.receptions.indexOf(element);
          delete this.receptions[index];
          this.receptions.splice(index,1)
        }
      });
    }
  }

  getAllUsers(): void {
    this.users = [];
    var sentUsers: User[] = [];
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log(this.formId);
        this.formService.getFormReceptions(this.formId).subscribe(
          (data2: Reception[]) =>{
            data2.forEach(element => {
              sentUsers.push(element.user!)
            });

            for (let i = 0; i < sentUsers.length; i++) {
              this.users = this.users.filter(option => option.id != sentUsers[i].id);          
            }

            if (this.users.length == 0) {
              this.noUsers = true;
            }
            else {
              this.noUsers = false;
            }

          }
        )
      }
    );
  }

}
