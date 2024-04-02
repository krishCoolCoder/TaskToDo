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
import { ApiCall } from 'src/app/dependancy/apiService.service';

@Component({
  selector: 'app-add-project-model',
  templateUrl: './add-project-model.component.html',
  styleUrls: ['./add-project-model.component.css']
})
// await this.testing.projectPostApi(
//   {
//     projectName: this.title,
//     projectDescription: this.description
//     // organisationRef : organisationTeamMapping.currentOrganisation,
//     // teamRef : organisationTeamMapping.currentTeam
//   }
// )
// this.outputValue.emit({data: "response"});
export class AddProjectModelComponent {
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
  status?: string | undefined | null = 'Active';

  editView: boolean = false;

  constructor ( private api: ApiService, private testing: ApiCall) {}

  ngOnInit(): void {
    // console.log(
    //   'The value of inputValue in ngOnInit() child component is this : ',
    //   this.inputValue,
    //   ' and the isEdit is this : ',
    //   this.isEdit
    // );
    console.log("Into the ngOnInit : ")
    console.log("ppppppp[p The value of this.inputValue is this : ", this.inputValue)
    if (this.isEdit) {
      console.log("Into the if : ")
        this.taskNo = this.inputValue.taskNo;
        this.title = this.inputValue.taskTitle;
        this.description = this.inputValue?.taskDescription;
        this.status = this.inputValue.taskStatus;
        this.editView = true;
    } else {
      this.taskNo = '';
      this.title = '';
      this.description = '';
      this.status = '';
      this.editView = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    try {
      console.log("Into the ngOnChanges : ")
      console.log(
        'The value of inputValue in gOnChanges() child component is this : ',
        this.inputValue,
        ' and the isEdit is this : ',
        this.isEdit
      );
      if (this.isEdit) {
          this.editView = true;
          this.status = this.inputValue?.projectStatus;
          this.taskTitle.nativeElement.value = this.inputValue?.projectName || '';
          this.taskDescription.nativeElement.value = this.inputValue.projectDescription || '';
      } else {
        this.taskNo = '';
        this.title = '';
        this.description = '';
        this.status = '';
        this.editView = false;
      }
      // this.taskTitle = this.inputValue.title;
      // this.taskDescription = this.inputValue.description;
      // if (this.isEdit === true) {
      //   if (this.inputValue.taskNo) {
      //     // console.log('Into the if on true on ngOnChanges');
      //     this.taskNo = this.inputValue.taskNo;
      //     this.title = this.inputValue.title;
      //     this.description = this.inputValue.description;
      //     this.taskTitle.nativeElement.value = this.inputValue?.title || '';
      //     this.taskDescription.nativeElement.value =
      //       this.inputValue.description || '';
      //     this.status = this.inputValue.status;
      //     this.editView = true;
      //   }
      // } else if (this.isEdit === false) {
      //   // console.log('Into the else if on false on ngOnChanges');
      //   this.taskTitle.nativeElement.value = '';
      //   this.taskDescription.nativeElement.value = '';
      //   this.taskNo = '';
      //   this.title = '';
      //   this.description = '';
      //   this.status = '';
      //   this.editView = false;
      // }
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
    if (!this.inputValue?._id) {
      await this.testing.projectPostApi({
        projectName: this.title,
        projectDescription: this.description
      });
      this.outputValue.emit({ data: 'response' });
    } else if (this.inputValue?._id) {
      this.title = this.taskTitle.nativeElement.value;
      this.description = this.taskDescription.nativeElement.value;
      await this.testing.projectPatchApi({
        id : this.inputValue._id,
        projectName: this.title,
        projectDescription: this.description
      });
        this.outputValue.emit({data: "response"});
    };
    this.outputValue.emit({
      taskNo: this.taskNo
    });
  }

  onSubmit() {
    this.taskTitle.nativeElement.value = '';
    this.taskDescription.nativeElement.value = '';
    this.myForm.resetForm();
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
