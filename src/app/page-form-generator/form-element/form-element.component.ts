import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { InputModel, SelectEntry } from 'app/model/input.model';




@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.css']
})
export class FormElementComponent implements OnInit {

  @Input() elementProperties!: InputModel;
  @Input() fNature!: number;
  @Input() isDisabled!: boolean;

  @Output() outputEvent = new EventEmitter<InputModel>();

  val: string = "NewValue";
  viewval: string = "New Value";

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.elementProperties)
  }

  handleChange($event: any): void{
    // console.log($event);
    // this.outputEvent.emit(this.elementProperties);
  }

  onChange(): void{
    console.log('change');
    this.outputEvent.emit(this.elementProperties);
  }

  addToSelect(): void{
    this.elementProperties.selectEntries!.push({value: this.val, viewValue: this.viewval});
    this.onChange();
  }

  deleteFromSelect(se : SelectEntry): void{
    const index = this.elementProperties.selectEntries!.indexOf(se);
    delete this.elementProperties.selectEntries![index];
    this.elementProperties.selectEntries!.splice(index, 1);
    this.onChange();
  }

}
