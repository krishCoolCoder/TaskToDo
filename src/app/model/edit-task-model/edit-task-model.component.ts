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
import { FilterService } from 'src/app/service/filter.service';
import { ApiCall } from 'src/app/dependancy/apiService.service';

@Component({
  selector: 'app-edit-task-model',
  templateUrl: './edit-task-model.component.html',
  styleUrls: ['./edit-task-model.component.css']
})
export class EditTaskModelComponent {
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

  userList ?: any = "";
  userRefId?: any;
  userFullName ?: any;

  constructor ( 
    private api: ApiService, 
    private filter : FilterService,
    private testApi : ApiCall ) {}

  async ngOnInit(): Promise<any> {
        this.taskNo = this.inputValue.taskNo;
        this.title = this.inputValue.taskTitle;
        this.description = this.inputValue?.taskDescription;
        this.status = this.inputValue.taskStatus;
        this.editView = true;
        this.userRefId = this.inputValue?.taskAssignedTo?._id;
        console.log("Into the ngOnInit for edit task")
      }
      
      async ngOnChanges(changes: SimpleChanges): Promise<any> {
        try {
          console.log("Into the ngOnChanges for edit task")
          this.editView = true;
          this.status = this.inputValue?.taskStatus;
          this.taskTitle.nativeElement.value = this.inputValue?.taskTitle || '';
          this.taskDescription.nativeElement.value = this.inputValue.taskDescription || '';
          this.userRefId = this.inputValue?.taskAssignedTo?._id;
          this.userList = await this.testApi.userListApi(!this.filter.isHeaderFilterEmpty() ? this.filter.getAllHeaderFilter() : null);
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
    let data = value.target as HTMLParagraphElement;
    this.status = data.textContent;
  }

   async giveInputValue(): Promise<any> {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));

      this.title = this.taskTitle.nativeElement.value;
      this.description = this.taskDescription.nativeElement.value;
      let taskDeleteApi = await this.api.taskUpdateApi(
        {
          id : this.inputValue._id,
          taskTitle: this.title,
          taskDescription: this.description,
          taskStatus: this.status || this.inputValue.taskStatus,
          projectRef : this.filter.getProjectId(),
          teamRef : this.filter.getTeamId(),
          organisationRef : this.filter.getOrganisationId(),
          taskUpdatedBy: currentUser.data[0]._id,
          taskAssignedTo : this.userRefId
        }
      ).pipe(
        map((response: any) => {
          console.log("The response of the api is this : ", response);
          this.outputValue.emit({data: response});
          return response; // Forward the response to the next operator
        }),
        catchError((error) => {
          // Handle error response here
          console.error('API Error:', error);
          alert(error.error.message || error.statusText)
          this.outputValue.emit({data: "response"});
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
  }

  onSubmit() {
    this.taskTitle.nativeElement.value = '';
    this.taskDescription.nativeElement.value = '';
    this.myForm.resetForm();
  }

  updateUserRef(data: any): any {
    this.userRefId = data._id;
    this.userFullName = `${data.firstName} ${data.lastName}`
    console.log("The vlue isss : ", this.userRefId, " and the data is this : ", data)
  }

  onModalClose() {
    this.editView = false;
    if (this.isEdit === false) {
      this.title = '';
      this.description = '';
      this.taskTitle.nativeElement.value = '';
      this.taskDescription.nativeElement.value = '';
    }
  }
}
