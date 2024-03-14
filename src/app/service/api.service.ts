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
  queryListApi() {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.get(`${this.apiUrl}/query/queryList`,options)
  }
  queryCreateApi(payload : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.post(`${this.apiUrl}/query/createQuery`,payload, options)
  }
  queryUpdateApi(payload : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.patch(`${this.apiUrl}/query/updateQuery`,payload, options)
  }
  queryDeleteApi(queryId : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.delete(`${this.apiUrl}/query/deleteQuery?queryId=${queryId}`,options)
  }
  requestListApi() {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.get(`${this.apiUrl}/request/requestList`,options)
  }
  requestCreateApi(payload : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.post(`${this.apiUrl}/request/createRequest`,payload, options)
  }
  requestUpdateApi(payload : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.patch(`${this.apiUrl}/request/updateRequest`,payload, options)
  }
  requestDeleteApi(requestId : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.delete(`${this.apiUrl}/request/deleteRequest?requestId=${requestId}`,options)
  }
  todoListApi() {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.get(`${this.apiUrl}/todo/todoList`,options)
  }
  todoCreateApi(payload : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.post(`${this.apiUrl}/todo/createTodo`,payload, options)
  }
  todoUpdateApi(payload : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.patch(`${this.apiUrl}/todo/updateTodo`,payload, options)
  }
  todoDeleteApi(requestId : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.delete(`${this.apiUrl}/todo/deleteTodo?todoId=${requestId}`,options)
  }
  userListApi() {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.get(`${this.apiUrl}/user/userList`,options)
  }
  userCreateApi(payload : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.post(`${this.apiUrl}/user/createUser`,payload, options)
  }
  userUpdateApi(payload : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.patch(`${this.apiUrl}/user/updateUser`,payload, options)
  }
  userDeleteApi(requestId : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.delete(`${this.apiUrl}/user/deleteUser?userId=${requestId}`,options)
  }
}
