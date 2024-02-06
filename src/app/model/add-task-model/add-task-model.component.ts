import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-task-model',
  templateUrl: './add-task-model.component.html',
  styleUrls: ['./add-task-model.component.css']
})
export class AddTaskModelComponent implements OnInit, OnChanges {
  @ViewChild('myForm')
  myForm!: NgForm;
  @ViewChild('taskTitle')
  taskTitle!: ElementRef;
  @ViewChild('taskDescription')
  taskDescription!: ElementRef;
  
  @Output()
  outputValue : any = new EventEmitter<string>();
  
  @Input()
  inputValue: any;
  
  ngOnInit(): void {
    console.log("The value of inputValue in child component is this : ",this.inputValue)
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    try {

      console.log("The value of inputValue in child component is this : ",this.inputValue);
      // this.taskTitle = this.inputValue.title;
      // this.taskDescription = this.inputValue.description;
      this.taskTitle.nativeElement.value = this.inputValue.title || "";
      this.taskDescription.nativeElement.value = this.inputValue.description || "";
    } catch ( error : any) {
      console.log("The error is this : ", error.name)
    }
  }

  // task : any = {
  //   taskNo : 0,
  //   title : "",
  //   description : ""
  // }

  taskNo : any = 0;
  title: string = "";
  description : string = "";
  status ?: string | undefined | null = '';

  model: boolean =false ;

  // ngOnInit() : void {
  //   this.task = {
  //     taskNo: 0,
  //     title: "",
  //     description: ""
  //   }
  // }

  formTitle(event: any) : any {
    this.title = event?.target.value;
  }
  formDescription(event: any) : any {
    this.description = event?.target.value;
  }

  updateStatus(value: any): any {
    console.log("The value is this : ", value.target  as HTMLParagraphElement);
    let data =  value.target  as HTMLParagraphElement;
    this.status = data.textContent;
    console.log("The vlue isss : ", this.status, " and the data is this : ", data)
  }

  giveInputValue() : any {
    let userTasks = JSON.parse(<any>localStorage.getItem('userTasks'));
    let loggedInUserData = JSON.parse(<any>localStorage.getItem('loggedInUser'));
    console.log("The loggedInUerData is this : ", loggedInUserData)
    this.taskNo = Math.floor(Math.random() * 9000) + 1000;
    userTasks.push(
      {
        taskNo : this.taskNo,
        title: this.title,
        description : this.description,
        status : this.status == '' ? "Created" : this.status,
        assignedBy : loggedInUserData.userName
      }
    )
    localStorage.setItem('userTasks',JSON.stringify(userTasks));
    this.outputValue.emit({
      taskNo : this.taskNo,
      title: this.title,
      description : this.description,
      status : this.status == '' ? "Created" : this.status 
    });
    this.description="";
    this.title="";
    this.taskNo=0;
    this.taskTitle.nativeElement.value = "";
    this.taskDescription.nativeElement.value = "";
  }
  
  onSubmit() {
    this.taskTitle.nativeElement.value = "";
    this.taskDescription.nativeElement.value = "";
    this.myForm.resetForm();
  }

}
