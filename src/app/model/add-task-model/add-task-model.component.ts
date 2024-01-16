import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-task-model',
  templateUrl: './add-task-model.component.html',
  styleUrls: ['./add-task-model.component.css']
})
export class AddTaskModelComponent {
  @Output()
  inputValue : any = new EventEmitter<string>();

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
    this.inputValue.emit({
      taskNo : this.taskNo,
      title: this.title,
      description : this.description,
      status : this.status == '' ? "Created" : this.status 
    });
    this.description="";
    this.title="";
    this.taskNo=0;
  }

}
