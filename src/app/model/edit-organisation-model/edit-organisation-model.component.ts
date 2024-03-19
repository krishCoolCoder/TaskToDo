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
  AfterViewInit,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-organisation-model',
  templateUrl: './edit-organisation-model.component.html',
  styleUrls: ['./edit-organisation-model.component.css']
})
export class EditOrganisationModelComponent {
  
  @ViewChild('myForm')
  myForm!: NgForm;
  @ViewChild('organisationNameFields')
  organisationNameField!: ElementRef;
  @ViewChild('organisationDescriptionFields')
  organisationDescriptionField!: ElementRef;
  
  @Output()
  outputValue : any = new EventEmitter<string>();

  @Input()
  inputValue: any;

  @Input()
  isEdit?: boolean;

  organisationId : any = 0;
  organisationTitle: string = "";
  organisationDescription : string = "";
  organisationAccessControl ?: string | undefined | null = '';

  constructor ( private api: ApiService,private cdr: ChangeDetectorRef , private zone: NgZone) {
    console.log("Into the conroller of add-organisation")
  }
  // ngOnInit(): void {
  //   console.log("Hello world;")
  // }

  ngOnInit(): void {
    try {
      if (this.organisationNameField && this.organisationDescriptionField) {
        if (this.inputValue) {
          this.zone.run(() => {
            // setTimeout(() => {
              // Update the values here
              // Update the values here
              let name = this.inputValue.organisationName;
              let description = this.inputValue.organisationDescription;
              this.organisationTitle = name;
              this.organisationDescription = description;
              // this.organisationNameField.nativeElement.value = "Freaking hell";
              // this.organisationDescriptionField.nativeElement.value = this.inputValue.organisationName;
              // console.log("The native value in the ngInit is this : ",this.organisationNameField.nativeElement.value, " and the organisationTitle is this : ", this.organisationTitle)
              // Manually run change detection
              this.cdr.detectChanges();
            // }, 1000);
          });
        } else {
          this.organisationTitle = "";
          this.organisationDescription = "";
        }
      } else {
        console.log("ViewChild elements are not initialized yet.");
      }
    // if (this.inputValue) {
    //   console.log("into the if and the value is this  : ", this.organisationTitle, " and ", this.organisationDescription, " and the inputvalue is this : ", this.inputValue);
    //   let name = this.inputValue.organisationName;
    //   let description = this.inputValue.organisationDescription;
    //   this.organisationTitle = name;
    //   this.organisationDescription = description;
    //   console.log("Testing the organisationNameField : ", this.organisationNameField)
    //     this.organisationNameField.nativeElement.value = "Freaking hell   ";
    //     this.organisationDescriptionField.nativeElement.value = this.inputValue.organisationName;
    // } else  {
    //   console.log("Into the else on ngOnInit")
    //   this.organisationTitle = "";
    //     this.organisationDescription = "";
    // }
    } catch ( error ) {
      console.log("The error in ngOnInit is this : ", error)
    }
  }

  ngAfterViewInit(): void {
    try {
    //   console.log("After the viwe init is this : ")
    //   setTimeout(() => {
    //   if (this.inputValue) {
    //     console.log("INTO THE IF")
    //     let name = this.inputValue.organisationName;
    //     let description = this.inputValue.organisationDescription;
    //     this.organisationTitle = name + " kya re";
    //     this.organisationDescription = description + " Sai 2";
    //     // this.organisationNameField.nativeElement.value = "Freaking hell";
    //     // this.organisationDescriptionField.nativeElement.value = this.inputValue.organisationName;
    //     console.log("The test : ", this.organisationNameField, " and the input value is this : ", this.inputValue)
    //   } else {
    //     console.log("INTO THE ELSE")
    //     this.organisationTitle = "";
    //     this.organisationDescription = "";
    //   }
    // },1000);
    } catch (error) {
      console.log("Error updating ViewChild elements:", error);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    try {
      console.log("Into the ngOnchanges for the edit organisation and team and the this.inputValue is this : ", this.inputValue, " and the change is this : ", changes)
      if (this.inputValue?._id) {
        this.organisationTitle = this.inputValue.organisationName;
        this.organisationDescription = this.inputValue.organisationDescription ;
        console.log("into the if and the value is this  : ", this.organisationTitle, " and ");
        this.cdr.detectChanges();
    } else  {
      this.organisationTitle = "";
        this.organisationDescription = "";
    }
    } catch (error: any) {
      console.log('The error is this : ', error);
    }
  }

  formOrganisationName(event: any) : any {
    this.organisationTitle = event?.target.value;
  }
  formDescription(event: any) : any {
    this.organisationDescription = event?.target.value;
  }

  updateAccessControl(value: any): any {
    console.log("The value is this : ", value.target  as HTMLParagraphElement);
    let data =  value.target  as HTMLParagraphElement;
    this.organisationAccessControl = data.textContent;
    console.log("The vlue isss : ", this.organisationAccessControl, " and the data is this : ", data)
  }

  async giveInputValue() : Promise<any> {
    console.log("Into the giveInputValue ; ")
    if (!this.inputValue?._id){
      console.log("I am optimus prime")
      let organisationCreateApi = await this.api.organisationCreateApi(
        {
          organisationName: this.organisationTitle,
          organisationDescription: this.organisationDescription,
          organisationType: this.organisationAccessControl || "Private"
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
        let organisationListApi = await this.api.organisationUpdateApi(
          {
            id : this.inputValue._id,
            organisationName: this.organisationTitle,
            organisationDescription: this.organisationDescription,
            organisationType: this.organisationAccessControl || "Private"
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
    this.organisationNameField.nativeElement.value = "";
    this.organisationDescriptionField.nativeElement.value = "";
    this.myForm.resetForm();
  }
  onModalClose() {
  
  }
}
