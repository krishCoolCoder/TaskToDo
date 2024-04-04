import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-view-project-model',
  templateUrl: './view-project-model.component.html',
  styleUrls: ['./view-project-model.component.css']
})
export class ViewProjectModelComponent implements OnInit, OnChanges{
  @Input()
  inputValue : any;
  
  ngOnInit() : any {
    console.log("The inputValue in the view model is this : ", this.inputValue)
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("The inputValue in the view model is this : ", this.inputValue)
  }
}
