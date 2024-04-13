import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { catchError, map } from 'rxjs/operators';
import { FilterService } from 'src/app/service/filter.service';

@Component({
  selector: 'app-add-todo-model',
  templateUrl: './add-todo-model.component.html',
  styleUrls: ['./add-todo-model.component.css']
})
export class AddTodoModelComponent implements OnInit, OnChanges{
  @ViewChild('myForm')
  myForm!: NgForm;
  @ViewChild('todoTitle')
  todoTitle!: ElementRef;
  
  @Output()
  outputValue : any = new EventEmitter<string>();
  
  @Input()
  inputValue: any;
  @Input()
  isEdit: any;

  todoData: any;

  constructor ( private api: ApiService, private filter : FilterService ) {}

  ngOnInit(): void {
    try {
      if (this.isEdit === true) {
      if(this.inputValue) {
        this.todoData = this.inputValue.todoData;
        this.todoTitle.nativeElement.value = this.todoData;
      }
    } else if (this.isEdit === false) {
      this.todoData = "";
      this.todoTitle.nativeElement.value = "";
    }
    } catch ( error ) {
      console.log("The error in ngOnInit is this : ", error)
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    try {
      if (this.isEdit === true) {
        if(this.inputValue) {
          this.todoTitle.nativeElement.value = this.inputValue.todoData || "";
          this.todoData = this.inputValue.todoData;
        }
      } else if (this.isEdit === false) {
        this.todoTitle.nativeElement.value = "";
        this.todoData = "";
      }
      console.log("Into ngOnChanges : ", this.todoData)
    } catch (error) {
      console.log("The error in ngOnChanges is this : ", error)
    }
  }
  formTodoData(event: any) {
    this.todoData = event?.target.value;
  }
  async giveInputValue() {
    console.log("(!this.inputValue?._id) is this : ", (!this.inputValue?._id), " and the input value is tihs : ", this.inputValue);
    if (!this.inputValue?._id){
      console.log("I am optimus prime")
      let todoListApi = await this.api.todoCreateApi(
        {
          todoData: this.todoData,
          todoProjectRef : this.filter.getProjectId(),
          todoTeamRef : this.filter.getTeamId(),
          todoOrganisationRef : this.filter.getOrganisationId(),
        }
      ).pipe(
        map((response: any) => {
          console.log("add-todo-model.component.ts says that response after create is this : ", response);
          // this.noData = response.data.length === 0 ? true : false;
          // this.taskList = response?.data
          this.outputValue.emit({data:"response"});
          return response; // Forward the response to the next operator
        }),
        catchError((error) => {
          // Handle error response here
          console.error('API Error:', error);
          alert(error.error.message || error.statusText)
          this.outputValue.emit({data:"response"});
          throw error; // Re-throw the error to propagate it
          // Alternatively, you can return a default value or another Observable here
          // return of(defaultValue); // Return a default value
          // return throwError('Error occurred'); // Return another Observable
        })
      ).subscribe({
          next: (data) => {
            console.log('API Response:', data);
            // this.loader = false;
            // Handle the response data here
          },
          error: (error) => {
            console.error('API Error:', error);
            // this.loader = false;
            // Handle any errors here
          }
        });
        // this.outputValue.emit({data:"response"});
      } else {
        console.log("I am megatron.")
        let todoListApi = await this.api.todoUpdateApi(
          {
            id : this.inputValue._id,
            todoData: this.todoData,
            todoProjectRef : this.filter.getProjectId(),
            todoTeamRef : this.filter.getTeamId(),
            todoOrganisationRef : this.filter.getOrganisationId(),
        }
        ).pipe(
          map((response: any) => {
            console.log("add-query-model.component.ts says that response is this : ", response);
            // this.noData = response.data.length === 0 ? true : false;
            // this.taskList = response?.data
            this.outputValue.emit({data:"response"});
            return response; // Forward the response to the next operator
          }),
          catchError((error) => {
            // Handle error response here
            console.error('API Error:', error);
            alert(error.error.message || error.statusText)
            this.outputValue.emit({data:"response"});
            throw error; // Re-throw the error to propagate it
            // Alternatively, you can return a default value or another Observable here
            // return of(defaultValue); // Return a default value
            // return throwError('Error occurred'); // Return another Observable
          })
        ).subscribe({
            next: (data) => {
              console.log('API Response:', data);
              // this.loader = false;
              // Handle the response data here
            },
            error: (error) => {
              console.error('API Error:', error);
              // this.loader = false;
              // Handle any errors here
            }
          });
          // this.outputValue.emit({data:"response"});
      }
  }
  onSubmit() {
    this.todoData = "";
    this.todoTitle.nativeElement.value = "";
    this.myForm.resetForm();
  }
  onModelClose() {
    if (this.isEdit === false) {
      this.todoTitle.nativeElement.value = "";
      this.todoData = "";
    }
  }
}
