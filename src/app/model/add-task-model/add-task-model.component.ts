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

  @ViewChild('exampleModalCenter') modalElement!: ElementRef;

  editView: boolean = false;
  
  ngOnInit(): void {
    console.log("The value of inputValue in child component is this : ",this.inputValue)
    if (this.inputValue) {
    this.taskNo = this.inputValue.taskNo;
        this.title = this.inputValue.title;
        this.description = this.inputValue.description;
        this.status = this.inputValue.status;
        this.editView = true
    }
  }
  // #exampleModalCenter > div > div > div.modal-header > button
  onModelClose(){
    console.log("I got called, so close and it and do your thing.")
  }
  ngOnChanges(changes: SimpleChanges): void {
    try {

      console.log("The value of inputValue in child component is this : ",this.inputValue);
      // this.taskTitle = this.inputValue.title;
      // this.taskDescription = this.inputValue.description;
      this.taskTitle.nativeElement.value = this.inputValue.title || "";
      this.taskDescription.nativeElement.value = this.inputValue.description || "";
      if (this.inputValue.taskNo) {
      this.taskNo = this.inputValue.taskNo;
        this.title = this.inputValue.title;
        this.description = this.inputValue.description;
        this.status = this.inputValue.status;
        this.editView = true;
      }

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
  }

  giveInputValue() : any {
    let userTasks = JSON.parse(<any>localStorage.getItem('userTasks'));
    let loggedInUserData = JSON.parse(<any>localStorage.getItem('loggedInUser'));
    if (this.inputValue) {
      this.editView = true;
      console.log("Into the if : ")
      let filteredData = userTasks.forEach((data: any, index: number)=> {
        if (data.taskNo === this.inputValue.taskNo) {
          userTasks[index] = {
            taskNo : this.inputValue.taskNo,
            title: this.title,
            description : this.description,
            status : this.status == '' ? "Created" : this.status,
            assignedBy : loggedInUserData.userName
          };
          localStorage.setItem('userTasks',JSON.stringify(userTasks));
          this.outputValue.emit({
            taskNo : this.taskNo,
            title: this.title,
            description : this.description,
            status : this.status == '' ? "Created" : this.status,
            assignedBy : loggedInUserData.userName
          });
        } 
      });
      this.inputValue = null;
      this.title = "";
      this.description = "";
      this.taskTitle.nativeElement.value = "";
    this.taskDescription.nativeElement.value = "";
    this.myForm.resetForm();
      // this.taskNo = "";
      return ;
    }
    this.taskNo = Math.floor(Math.random() * 9000) + 1000;
    userTasks.push(
      {
        taskNo : this.taskNo,
        title: this.title,
        description : this.description,
        status : "Created",
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

  onModalClose() {
    // Handle the modal close event here
    console.log('Modal closed');
    // Add your logic here
    this.editView = false;
    this.inputValue = null;
      this.title = "";
      this.description = "";
      this.taskTitle.nativeElement.value = "";
    this.taskDescription.nativeElement.value = "";
    this.myForm.resetForm();
  }

}
