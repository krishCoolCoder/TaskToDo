import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-view-user-model',
  templateUrl: './view-user-model.component.html',
  styleUrls: ['./view-user-model.component.css']
})
export class ViewUserModelComponent implements OnInit, OnChanges{
  @Input()
  inputValue : any;
  
  ngOnInit() : any {
    console.log("The inputValue in the view model is this : ", this.inputValue)
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("The inputValue in the view model is this : ", this.inputValue)
  }
}
