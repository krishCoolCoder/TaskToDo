import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-view-query-model',
  templateUrl: './view-query-model.component.html',
  styleUrls: ['./view-query-model.component.css']
})
export class ViewQueryModelComponent implements OnInit, OnChanges{
  @Input()
  inputValue : any;
  
  ngOnInit() : any {
    console.log("The inputValue in the view model is this : ", this.inputValue)
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("The inputValue in the view model is this : ", this.inputValue)
  }
}
