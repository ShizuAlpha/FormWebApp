import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Form } from 'app/model/form.model';
import { Reception } from 'app/model/reception.model';
import { Response, Answer, ResponseDTO } from 'app/model/response.model';
import { FormService } from 'app/services/form.service';
import { InputModel } from 'app/model/input.model';
import { Direction } from '@angular/cdk/bidi/directionality';
import { ResponseService } from 'app/services/response.service';
import { ReceptionService } from 'app/services/reception.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

export interface ReceptionForm {
  reception: Reception;
  form?: Form;
  backround?:string;
  border?: string;
}

@Component({
  selector: 'app-page-form-response',
  templateUrl: './page-form-response.component.html',
  styleUrls: ['./page-form-response.component.css']
})
export class PageFormResponseComponent implements OnInit {

  userId: number = +JSON.parse(this.localStorage.retrieve('user')).id;

  receptions!: Reception[];
  forms!: Form[];
  receptionForm!: ReceptionForm[];
  selectedReceptionForm!: ReceptionForm;

  show: boolean = false;
  reload: boolean = true;
  disabled: boolean = true;
  selectionDisplay: boolean = false;

  formAlignment: Direction = "ltr";
  formPreview!: InputModel[];
  formTitle: string = "";
  formId!:  number;

  answers: Answer[] = [];
  response: Answer[] = [];

  myControl = new FormControl();
  filteredOptions!: Observable<ReceptionForm[]>;
  receptionFilter: string = "All";
  filteredReceptionForm!: ReceptionForm[];

  constructor(private localStorage: LocalStorageService,
    private userService: UserService,
    private formService: FormService,
    private responseService: ResponseService,
    private receptionService: ReceptionService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserReceptions();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): ReceptionForm[] {
    const filterValue = value.toLowerCase();

    return this.filteredReceptionForm.filter(option => option.form?.name.toLowerCase().includes(filterValue));
  }

  onChange(): void{
    if (this.receptionFilter == "All") {
      console.log("All")
      this.filteredReceptionForm = this.receptionForm;
      this.myControl.setValue(" ")
      this.myControl.setValue("")
    }
    else if (this.receptionFilter == "NonRep") {
      console.log("NonRep") 
      this.filteredReceptionForm = this.receptionForm.filter(option => option.reception.status == 0);
      this.myControl.setValue(" ")
      this.myControl.setValue("")
    }
    else if (this.receptionFilter == "Rep") {
      console.log("Rep")
      this.filteredReceptionForm = this.receptionForm.filter(option => option.reception.status == 1);
      this.myControl.setValue(" ")
      this.myControl.setValue("")
    }
  }

  reloadDiv(): void{
    this.reload = false;
    setTimeout(() => this.reload = true);
  }

  getUserReceptions(): void {
    this.receptions = [];
    this.receptionForm = [];
    this.filteredReceptionForm = [];
    this.userService.getUserReceptions(this.userId).subscribe(
      (response: Reception[]) =>{
        this.receptions = response;
        response.forEach(element => {
          if (element.status == 0) {
            this.receptionForm.push({reception : element, backround: "white", border: "solid 2px red"})
          }else {
            this.receptionForm.push({reception : element, backround: "#f5f5f5", border: "solid 1px 0px 0px 0px red"})
          }
        });
        console.log(this.receptions)
        console.log(this.receptionForm)
        this.filteredReceptionForm = this.receptionForm;
        this.formPreview = [];
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );

    this.forms = [];
    this.formService.getFormReceptionsByUser(this.userId).subscribe(
      (response: Form[]) =>{
        this.forms = response;
        if (response.length != this.receptionForm.length) {
          console.log("missmatch!!")
        }
        for (let i = 0; i < this.receptionForm.length; i++) {
          this.receptionForm[i].form = this.forms[i];
        }
        this.show = true;
        console.log(this.forms)
        this.receptionForm.sort((a,b) => (a.reception.id! > b.reception.id!) ? -1 : ((b.reception.id! < a.reception.id!) ? 1 : 0));
        console.log(this.receptionForm)
        this.filteredReceptionForm = this.receptionForm;
        this.myControl.setValue(" ")
        this.myControl.setValue("")
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  formSelection(item: ReceptionForm): void{
    this.formPreview = [];
    this.selectionDisplay = true;
    this.formPreview = JSON.parse(item.form?.formString!);
    this.formTitle = item.form?.name!;
    if (item.form?.orientation) {
      this.formAlignment = 'rtl';
    }
    else {
      this.formAlignment = 'ltr';
    }
    this.formId = item.form?.id!;
    console.log(this.formId);
    this.selectedReceptionForm = item;
  }

  responseSelection(item: ReceptionForm): void{
    this.response = [];
    this.selectionDisplay = false;
    this.formTitle = item.form?.name!;
    if (item.form?.orientation) {
      this.formAlignment = 'rtl';
    }
    else {
      this.formAlignment = 'ltr';
    }
    this.formId = item.form?.id!;
    console.log(this.formId);
    this.selectedReceptionForm = item;
    this.responseService.getReceptionResponse(item.reception.id!).subscribe(
      (data: Response) =>{
        this.response = JSON.parse(data.responseString);
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  confirm(templateRef: TemplateRef<any>): void{
    this.dialog.open(templateRef);
  }

  submitAnswer(): void{
    this.answers = [];
    this.formPreview.forEach(element => {
      if(element.answer != undefined){
        this.answers.push({label: element.label, answer: element.answer.toString()});
      } else if (element.nature == 4 || element.nature == -4) { } 
      else{
        this.answers.push({label: element.label, answer: "false"});
      }
    });
    console.log(this.answers)
    console.log(JSON.stringify(this.answers))
    var response: ResponseDTO = {date: new Date, 
      responseString: JSON.stringify(this.answers), 
      stat: 0,
      user: this.userId,
      form: this.formId
    }
    this.responseService.createResponse(response).subscribe(
      (data: Response) =>{
        console.log(data);
        return String
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    );
    var reception: Reception = {dateReception: this.selectedReceptionForm.reception.dateReception,
      status: 1
    }
    this.receptionService.updateReception(this.selectedReceptionForm.reception.id!, reception).subscribe(
      (data: Reception) =>{
        console.log(data);
        this.getUserReceptions();
        return String
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      }
    );
    this.reloadDiv();
    this.dialog.closeAll();
  }

}
