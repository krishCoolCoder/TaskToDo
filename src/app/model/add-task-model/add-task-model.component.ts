import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { catchError, map } from 'rxjs/operators';
@Component({
  selector: 'app-add-task-model',
  templateUrl: './add-task-model.component.html',
  styleUrls: ['./add-task-model.component.css'],
})
export class AddTaskModelComponent implements OnInit, OnChanges {
  @ViewChild('myForm')
  myForm!: NgForm;
  @ViewChild('taskTitle')
  taskTitle!: ElementRef;
  @ViewChild('taskDescription')
  taskDescription!: ElementRef;

  @Output()
  outputValue: any = new EventEmitter<string>();

  @Input()
  inputValue: any;

  @Input()
  isEdit?: boolean;

  @ViewChild('exampleModalCenter') modalElement!: ElementRef;

  taskNo: any = 0;
  title: string = '';
  description: string = '';
  status?: string | undefined | null = '';

  editView: boolean = false;

  constructor ( private api: ApiService ) {}

  ngOnInit(): void {
    // console.log(
    //   'The value of inputValue in ngOnInit() child component is this : ',
    //   this.inputValue,
    //   ' and the isEdit is this : ',
    //   this.isEdit
    // );
    if (this.isEdit === true) {
      if (this.inputValue) {
        this.taskNo = this.inputValue.taskNo;
        this.title = this.inputValue.title;
        this.description = this.inputValue.description;
        this.status = this.inputValue.status;
        this.editView = true;
      }
    } else if (this.isEdit === false) {
      console.log('Into the else if on false on ngOnInit');
      this.taskNo = '';
      this.title = '';
      this.description = '';
      this.status = '';
      this.editView = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    try {
      // console.log(
      //   'The value of inputValue in gOnChanges() child component is this : ',
      //   this.inputValue,
      //   ' and the isEdit is this : ',
      //   this.isEdit
      // );
      // this.taskTitle = this.inputValue.title;
      // this.taskDescription = this.inputValue.description;
      if (this.isEdit === true) {
        if (this.inputValue.taskNo) {
          // console.log('Into the if on true on ngOnChanges');
          this.taskNo = this.inputValue.taskNo;
          this.title = this.inputValue.title;
          this.description = this.inputValue.description;
          this.taskTitle.nativeElement.value = this.inputValue?.title || '';
          this.taskDescription.nativeElement.value =
            this.inputValue.description || '';
          this.status = this.inputValue.status;
          this.editView = true;
        }
      } else if (this.isEdit === false) {
        // console.log('Into the else if on false on ngOnChanges');
        this.taskTitle.nativeElement.value = '';
        this.taskDescription.nativeElement.value = '';
        this.taskNo = '';
        this.title = '';
        this.description = '';
        this.status = '';
        this.editView = false;
      }
    } catch (error: any) {
      console.log('The error is this : ', error);
    }
  }

  formTitle(event: any): any {
    this.title = event?.target.value;
  }
  formDescription(event: any): any {
    this.description = event?.target.value;
  }

  updateStatus(value: any): any {
    // console.log('The value is this : ', value.target as HTMLParagraphElement);
    let data = value.target as HTMLParagraphElement;
    this.status = data.textContent;
  }

   async giveInputValue(): Promise<any> {
    console.log("Into the giveInputValue on add-task-model and the value of inputValue : ",this.inputValue)
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    if (!this.inputValue?._id) {
    let taskDeleteApi = await this.api.taskCreateApi(
      {
        taskTitle: this.title,
        taskDescription: this.description,
        taskStatus: this.status == '' ? 'Created' : this.status,
        taskCreatedBy: currentUser.data[0]._id
        // organisationRef : organisationTeamMapping.currentOrganisation,
        // teamRef : organisationTeamMapping.currentTeam
      }
    ).pipe(
      map((response: any) => {
        console.log("The response of the api is this : ", response);
        // this.noData = response.data.length === 0 ? true : false;
        // this.taskList = response?.data
        return response; // Forward the response to the next operator
      }),
      catchError((error) => {
        // Handle error response here
        console.error('API Error:', error);
        alert(error.error.message || error.statusText)
        throw error; // Re-throw the error to propagate it
        // Alternatively, you can return a default value or another Observable here
        // return of(defaultValue); // Return a default value
        // return throwError('Error occurred'); // Return another Observable
      })).subscribe({
        next: (data) => {
          console.log('API Response:', data);
          // Handle the response data here
        },
        error: (error) => {
          console.error('API Error:', error);
          // Handle any errors here
        }
      });
      console.log("The response of api hit attempt is this : ",taskDeleteApi)
      this.outputValue.emit({data: "response"});
    } else if (this.inputValue?._id) {
      let taskDeleteApi = await this.api.taskUpdateApi(
        {
          id : this.inputValue._id,
          taskTitle: this.title,
          taskDescription: this.description,
          taskStatus: this.status || this.inputValue.taskStatus,
          taskUpdatedBy: currentUser.data[0]._id
          // organisationRef : organisationTeamMapping.currentOrganisation,
          // teamRef : organisationTeamMapping.currentTeam
        }
      ).pipe(
        map((response: any) => {
          console.log("The response of the api is this : ", response);
          this.outputValue.emit({data: response});
          // this.noData = response.data.length === 0 ? true : false;
          // this.taskList = response?.data
          return response; // Forward the response to the next operator
        }),
        catchError((error) => {
          // Handle error response here
          console.error('API Error:', error);
          alert(error.error.message || error.statusText)
          throw error; // Re-throw the error to propagate it
          // Alternatively, you can return a default value or another Observable here
          // return of(defaultValue); // Return a default value
          // return throwError('Error occurred'); // Return another Observable
        })).subscribe({
          next: (data) => {
            console.log('API Response:', data);
            // Handle the response data here
          },
          error: (error) => {
            console.error('API Error:', error);
            // Handle any errors here
          }
        });
        this.outputValue.emit({data: "response"});
        console.log("The response of api hit attempt is this : ",taskDeleteApi)
    }
    // let userTasks = JSON.parse(<any>localStorage.getItem('userTasks'));
    // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    // console.log("The organisationTeamMapping is this : ", organisationTeamMapping.currentOrganisation, " and ",organisationTeamMapping.currentTeam)
    // if (organisationTeamMapping === null || organisationTeamMapping.currentTeam === undefined || organisationTeamMapping.currentOrganisation === undefined ) {
    //   alert("Kindly select organisation/account type and team.");
    //   return;
    // }
    // let loggedInUserData = JSON.parse(
    //   <any>localStorage.getItem('loggedInUser')
    // );
    // if (this.isEdit === true) {
    //   if (this.inputValue !== false) {
    //     this.editView = true;
    //     // console.log('Into the if : ');
    //     let filteredData = userTasks.forEach((data: any, index: number) => {
    //       if (data.taskNo === this.inputValue.taskNo) {
    //         userTasks[index] = {
    //           taskNo: this.inputValue.taskNo,
    //           title: this.title,
    //           description: this.description,
    //           status: this.status == '' ? 'Created' : this.status,
    //           assignedBy: loggedInUserData.userName,
    //           organisationRef : organisationTeamMapping.currentOrganisation,
    //           currentTeamRef : organisationTeamMapping.currentTeam
    //         };
    //         localStorage.setItem('userTasks', JSON.stringify(userTasks));
    //         this.outputValue.emit({
    //           taskNo: this.taskNo,
    //           title: this.title,
    //           description: this.description,
    //           status: this.status == '' ? 'Created' : this.status,
    //           assignedBy: loggedInUserData.userName,
    //           organisationRef : organisationTeamMapping.currentOrganisation,
    //           currentTeamRef : organisationTeamMapping.currentTeam
    //         });
    //       }
    //     });
    //     this.inputValue = null;
    //     this.title = '';
    //     this.description = '';
    //     this.taskTitle.nativeElement.value = '';
    //     this.taskDescription.nativeElement.value = '';
    //     this.myForm.resetForm();
    //     // this.taskNo = "";
    //     return;
    //   }
    // }
    // this.taskNo = Math.floor(Math.random() * 9000) + 1000;
    // userTasks.push({
    //   taskNo: this.taskNo,
    //   title: this.title,
    //   description: this.description,
    //   status: 'Created',
    //   assignedBy: loggedInUserData.userName,
    //   organisationRef : organisationTeamMapping.currentOrganisation,
    //   currentTeamRef : organisationTeamMapping.currentTeam
    // });
    // localStorage.setItem('userTasks', JSON.stringify(userTasks));
    this.outputValue.emit({
      taskNo: this.taskNo
    });
    // this.description = '';
    // this.title = '';
    // this.taskNo = 0;
    // this.taskTitle.nativeElement.value = '';
    // this.taskDescription.nativeElement.value = '';
  }

  onSubmit() {
    this.taskTitle.nativeElement.value = '';
    this.taskDescription.nativeElement.value = '';
    this.myForm.resetForm();
  }

  onModalClose() {
    // Handle the modal close event here
    // console.log('Modal closed');
    // Add your logic here
    this.editView = false;
    // console.log(
    //   'Into the onModelClose() and the inputValue is this : ',
    //   this.inputValue
    // );
    if (this.isEdit === false) {
      // this.inputValue = null;
      this.title = '';
      this.description = '';
      this.taskTitle.nativeElement.value = '';
      this.taskDescription.nativeElement.value = '';
    }
  }
}
