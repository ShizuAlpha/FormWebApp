import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, copyArrayItem} from '@angular/cdk/drag-drop';
import { InputModel, InputModelDTO } from 'app/model/input.model';
import { LocalStorageService } from 'ngx-webstorage';
import { UserService } from 'app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InputService } from 'app/services/input.service';
import { CopyFormService } from 'app/services/copy-form.service';

@Component({
  selector: 'app-page-form-generator',
  templateUrl: './page-form-generator.component.html',
  styleUrls: ['./page-form-generator.component.css']
})
export class PageFormGeneratorComponent implements OnInit {


  userId: number = +JSON.parse(this.localStorage.retrieve('user')).id;

  listForm: InputModel[] = JSON.parse(this.copyFormService.getMessage());
  listPredefined: InputModel[] = [
    {
      label: "Text", 
      required: true,
      user: this.userId,
      nature: 4, 
      fontSize: "medium",
      fontWeight: "normal",
      textAlign: "justify"
    },
    {
      label: "Input", 
      required: true,
      user: this.userId,
      type: "text", 
      nature: 1, 
    },
    {
      label: "Select", 
      required: true,
      user: this.userId,
      nature: 2, 
      selectEntries: [
        {value: "0", viewValue: "Select 1"}, 
        {value: "2", viewValue: "Select 2"}, 
        {value: "3", viewValue: "Select 3"}
      ],
      multiple: false
    },
    {
      label: "Text Area", 
      required: true,
      user: this.userId,
      nature: 3, 
    },
    {
      label: "Radio", 
      required: true,
      user: this.userId,
      nature: 5, 
      selectEntries: [
        {value: "1", viewValue: "Radio 1"}, 
        {value: "2", viewValue: "Radio 2"}
      ]
    },
    {
      label: "Checkbox", 
      required: true,
      user: this.userId,
      nature: 6, 
      selectEntries: [
        {value: "true", viewValue: "Checkbox 1"}, 
        {value: "2", viewValue: "Checkbox 2"}
      ]
    }
  ];
  savedEntries: InputModel[] = [];

  formString: string = '';

  constructor(private localStorage: LocalStorageService,
    private userService: UserService,
    private inputService: InputService,
    public copyFormService: CopyFormService) {
   }

  ngOnInit(): void {
    this.getUserInputs();
    this.turnString();
    if(this.listForm == undefined){
      this.listForm = [];
    }
    console.log(this.listForm)
  }

  getUserInputs(): void {
    this.savedEntries = [];
    this.userService.getUserInputs(this.userId).subscribe(
      (response: InputModelDTO[]) =>{
        response.forEach(ele => {
          this.savedEntries.push(
            {
              id: ele.id,
              label: ele.label,
              nature: ele.nature,
              required: ele.required,
              multiple: ele.multiple,
              user: this.userId,
              selectEntries: JSON.parse(ele.selectEntries!),
              type: ele.type,
              fontSize: ele.fontSize,
              fontWeight: ele.fontWeight,
              textAlign: ele.textAlign
            }
          );
        });
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  saveElement(ele: InputModel){
    if (this.savedEntries.includes(ele)) {
      
    }
    const sentInput: InputModelDTO = {
      label: ele.label,
      nature: ele.nature,
      required: ele.required,
      multiple: ele.multiple,
      user: this.userId,
      selectEntries: JSON.stringify(ele.selectEntries),
      type: ele.type,
      fontSize: ele.fontSize,
      fontWeight: ele.fontWeight,
      textAlign: ele.textAlign
    }
    this.inputService.createInput(sentInput).subscribe(
      (response: InputModel) =>{
        return String;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
    this.savedEntries.push(ele);
  }

  deleteElement(ele : InputModel){
    const index = this.listForm.indexOf(ele);
    delete this.listForm[index];
    this.listForm.splice(index,1);

    if (this.listForm != []) {
    this.turnString();
    console.log(this.formString);     
    }else{
      this.formString = '';
    }
  }

  deleteSavedElement(ele : InputModel){
    this.inputService.deleteInput(ele).subscribe();
    console.log(ele);
    const index = this.savedEntries.indexOf(ele);
    delete this.savedEntries[index];
    this.savedEntries.splice(index,1);
  }

  outputReciever($event: InputModel): void{
    console.log($event);  
    if (this.listForm != []) {
    this.turnString();
    console.log(this.formString);     
    }
  }

  turnString(): void{
    this.formString = '';
    if (this.listForm != []) {
      this.formString = JSON.stringify(this.listForm);
    }
  }


  drop(event: CdkDragDrop<InputModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const inter = JSON.parse(JSON.stringify(event.previousContainer.data));
      console.log('test'); 
      console.log(inter);
      console.log(event.previousContainer);
      console.log(this.savedEntries);  
      copyArrayItem(inter, event.container.data, event.previousIndex, event.currentIndex);
    }
    if (this.listForm != []) {
    this.turnString();
    console.log(this.formString);     
    }
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }

}
