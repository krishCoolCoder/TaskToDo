import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-view-request-model',
  templateUrl: './view-request-model.component.html',
  styleUrls: ['./view-request-model.component.css']
})
export class ViewRequestModelComponent implements OnInit, OnChanges{
  @Input()
  inputValue : any;
  
  ngOnInit() : any {
    console.log("The inputValue in the view model is this : ", this.inputValue)
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("The inputValue in the view model is this : ", this.inputValue)
  }
}
