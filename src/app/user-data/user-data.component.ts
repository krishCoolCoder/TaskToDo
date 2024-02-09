import { Component,OnInit,OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit ,OnChanges{
  userData: any;
  // views state : 
  tableView : boolean = false;
  listView : boolean = false;
  cardView : boolean = true;

  showTableView () {
    this.tableView = true ;
    this.listView = false;
    this.cardView = false;
  }
  showListView () {
    this.tableView = false ;
    this.listView = true;
    this.cardView = false;
  }
  showCardView () {
    this.tableView = false ;
    this.listView = false;
    this.cardView = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userList = localStorage.getItem('userList');
    console.log("The ngOnChanges method has been called and the user Data is this : ", typeof this.userList)
  }
  ngOnInit(): void {
    this.userList = JSON.parse(<any>localStorage.getItem('userList'));
    this.noData = this.userList.length === 0 ? true : false;
    // this.userList.review = this.userList.performance === 0 ? "Lets see" : (this.userList.performance < 50 && this.userList.performance > 60 ) ? "Good" : ((this.userList.performance < 60 && this.userList.performance > 100)) ? "Very good" : "Satifactory";
    console.log("The ngOnInit is being called and the value is : ", this.userList)
    // throw new Error('Method not implemented.');
  }

  userList : any = [
    {
      userName : "Saikrishna P",
      userEmail : "saikrishnatechno@gmail.com",
      userRole : "Admin",
      totalTaskCount : 0,
      completedTaskCount : 0,
      pendingTaskCount : 0,
      taskToDoCount : 0,
      performance : 50,
      review : "Lets see"
    }
  ];
  // getReview () {
  //   this.userList.review = this.userList.performance === 0 ? "Lets see" : (this.userList.performance < 50 && this.userList.performance > 60 ) ? "Good" : ((this.userList.performance < 60 && this.userList.performance > 100)) ? "Very good" : "Satifactory"
  // }
  noData : boolean = true;

  getInputValue ($event: any) {
    console.log("The event value is this : ", $event);
    // this.userList.push({
    //   userName : $event.userName,
    //   userEmail : $event.userEmail
    // });
    let localStorageValue : any = localStorage.getItem("userList");
    console.log("The localStorageValue is this : ", localStorageValue)
    this.userList = JSON.parse(<any>localStorage?.getItem("userList"));
    this.noData = false; 
    console.log("The value of the data is this : ", JSON.parse(<any>localStorage?.getItem("userData")))
    console.log("And the array value is this : ", this.userList)
  } 
  test() {
    // localStorage.setItem('token','xhja787'); // This creates a key value pair in local storage.
    // localStorage.setItem('test','xhja787'); // This creates a key value pair in local storage.
    // let data = localStorage.getItem('userData'); // This method is used to get the value from the local storage using the key.
    // console.log("The value from the local storage is this : ", data);
    // localStorage.removeItem('token'); // To remove as specific data from the local storage use this method.
    // localStorage.clear() // Use this method to remove all the data from the local storage.
  }
  deleteUser(data: any) {
  console.log("The delete user method says : ","'"+data+"'");
  let userData = JSON.parse(<any>localStorage.getItem('userList'));
  userData.splice(data,1);
  this.userList = userData;
  localStorage.setItem('userList',JSON.stringify(userData))
  this.noData = this.userList.length === 0 ? true : false; 
  }
  editUser(data: any) {
    this.userData = data;
  }
}
