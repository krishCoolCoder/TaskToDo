import { Injectable } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'https://backend.tasktodo.app';

  constructor(private api : HttpClient) { }

  loginApi(payload: any) {
    return this.api.post(`${this.apiUrl}/login`,payload);
  }
  taskListApi() {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.get(`${this.apiUrl}/task/taskList`, options)
  }
  taskDeleteApi(taskId : string) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.delete(`${this.apiUrl}/task/deleteTask?taskId=${taskId}`, options)
  }
  taskCreateApi(payload : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.post(`${this.apiUrl}/task/createTask`,payload, options)
  }
  taskUpdateApi(payload : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.patch(`${this.apiUrl}/task/updateTask`,payload, options)
  }
}
