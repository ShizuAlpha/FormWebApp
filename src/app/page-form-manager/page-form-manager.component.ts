import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Form } from 'app/model/form.model';
import { InputModel } from 'app/model/input.model';
import { Reception, ReceptionDTO } from 'app/model/reception.model';
import { Answer, Response } from 'app/model/response.model';
import { FormService } from 'app/services/form.service';
import { ReceptionService } from 'app/services/reception.service';
import {Router} from '@angular/router';
import { UserService } from 'app/services/user.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Direction } from '@angular/cdk/bidi/directionality';
import { map, Observable, startWith } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'app/model/user.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CopyFormService } from 'app/services/copy-form.service';

export interface ResponseUser{
  response: Response;
  user: User;
}

@Component({
  selector: 'app-page-form-manager',
  templateUrl: './page-form-manager.component.html',
  styleUrls: ['./page-form-manager.component.css']
})
export class PageFormManagerComponent implements OnInit {

  userId: number = +JSON.parse(this.localStorage.retrieve('user')).id;

  receptions!: Reception[];
  forms!: Form[];
  responses: Response[] = [];
  selectedForm!: Form;
  formToDelete!: Form;
  formAlignment: Direction = "ltr";
  formPreview!: InputModel[];

  showList: boolean = false;
  showPrev: boolean = false;
  showForm: boolean = false;
  reload: boolean = true;
  disabled: boolean = true;
  selectionDisplay: boolean = false;
  noUsers: boolean = false;

  answers: Answer[] = [];
  labels: string[] = [];

  myControl = new FormControl();
  filteredOptions!: Observable<Form[]>;
  formFilter: string = "All";

  users: User[] = [];
  newReceptions: ReceptionDTO[] = [];

  constructor(private localStorage: LocalStorageService,
    private userService: UserService,
    private formService: FormService,
    private receptionService: ReceptionService,
    public dialog: MatDialog,
    public copyFormService: CopyFormService,
    public route: Router
    ) { }

  ngOnInit(): void {
    this.getUserForms();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): Form[] {
    const filterValue = value.toLowerCase();

    return this.forms.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getUsers(): void {
    this.users = [];
    var sentUsers: User[] = [];
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.formService.getFormReceptions(this.selectedForm.id!).subscribe(
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

  sendForm(templateRef: TemplateRef<any>): void{
    this.dialog.open(templateRef);
  }

  send(): void{
    console.log(this.newReceptions);
    this.receptionService.createMultipleReceptions(this.newReceptions).subscribe(
      (request: ReceptionDTO[]) =>{
        console.log("saved");
        console.log(request);
        this.newReceptions = [];
        return String;
      }
    )
    this.getUsers();
    this.dialog.closeAll();
  }

  showOptions(event:MatCheckboxChange, user: User): void {
    console.log(event.checked);
    if (event.checked) {
      this.newReceptions.push({dateReception: new Date, status: 0, form: this.selectedForm.id, user: user.id})
    }
    else{
      this.newReceptions.forEach(element => {
        if (element.user == user.id) {
          const index = this.newReceptions.indexOf(element);
          delete this.newReceptions[index];
          this.newReceptions.splice(index,1)
        }
      });
    }
  }

  getUserForms(): void{
    this.forms = [];
    this.userService.getUserForms(this.userId).subscribe(
      (data: Form[]) =>{
        this.forms = data;
        this.forms.sort((a,b) => (a.id! > b.id!) ? -1 : ((b.id! < a.id!) ? 1 : 0));
        this.showList = true;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  formSelection(item: Form): void{
    this.responses = [];
    this.answers = [];
    this.selectionDisplay = false;
    this.showPrev = false;
    this.selectedForm = item;
    this.formPreview = [];
    this.formPreview = JSON.parse(item.formString);
    if (item.orientation) {
      this.formAlignment = 'rtl';
    }
    else {
      this.formAlignment = 'ltr';
    }
    this.getUsers();
    this.formService.getFormResponses(item.id!).subscribe(
      (data: Response[]) =>{
        data.forEach(element => {
          this.responses.push({
            date: element.date,
            responseString: element.responseString,
            stat: element.stat,
            user: element.user,
            form: element.form,
            id: element.id,
            response: JSON.parse(element.responseString)
          });
        });
        if (this.responses.length == 0) {
          this.selectionDisplay = false;
        }
        else{
          this.selectionDisplay = true;
        }
        this.showPrev = true;
      }
    );
  }

  deleteConf(templateRef: TemplateRef<any>, form: Form): void{
    this.formToDelete = form;
    this.dialog.open(templateRef)
  }


  deleteForm(): void{
    this.formService.deleteForm(this.formToDelete).subscribe(
      (data: String) =>{
        console.log(data)
        const index = this.forms.indexOf(this.formToDelete);
        this.forms.splice(index,1)
        this.myControl.setValue(' ')
        this.myControl.setValue('')
      }
    );
  }

  copy(): void{
    this.copyFormService.setMessage(this.selectedForm.formString)
    this.route.navigateByUrl("/createform")
  }

  exportToExcel(): void{
    window.open(`http://localhost:8080/api/forms/${this.selectedForm.id!}/excel`, "_blank")
  }

}
