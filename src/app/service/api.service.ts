import { Injectable } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://localhost:3000';

  constructor(private api : HttpClient) { }

  loginApi(payload: any) {
    return this.api.post(`${this.apiUrl}/login`,payload);
  }
  taskListApi(payload : any = null) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log('The current user is this : ', currentUser);
    const headers = new HttpHeaders({
      Authentication: `${currentUser.token}`, // Set your header value here
    });
    const options = { headers: headers };
    let url = `${this.apiUrl}/task/taskList`;
    // Check if organizationId is provided
    console.log('The payload is this : ', payload);
    if (payload != null) {
      if (payload?.organisationId) {
        console.log('into the if on url');
        url += `?organisationId=${payload?.organisationId}`;
      }

      // Check if teamId is provided
      if (payload?.teamId) {
        // Check if URL already contains parameters
        url += url.includes('?')
          ? `&teamId=${payload?.teamId}`
          : `?teamId=${payload?.teamId}`;
      }

      // Check if projectId is provided
      if (payload?.projectId) {
        // Check if URL already contains parameters
        url += url.includes('?')
          ? `&projectId=${payload?.projectId}`
          : `?projectId=${payload?.projectId}`;
      }
      console.log('the url is this : ', url);
    }
    return this.api.get(url, options);
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
    console.log("The payload is this : ", payload)
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
  taskStatusUpdateApi(payload : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.patch(`${this.apiUrl}/task/updateTaskStatus`,payload, options)
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
  todoListApi(payload : any = null) {
    let url = `${this.apiUrl}/todo/todoList`;
            if (payload != null) {
              if (payload?.organisationId) {
                console.log('into the if on url');
                url += `?organisationId=${payload?.organisationId}`;
              }
        
              // Check if teamId is provided
              if (payload?.teamId) {
                // Check if URL already contains parameters
                url += url.includes('?')
                  ? `&teamId=${payload?.teamId}`
                  : `?teamId=${payload?.teamId}`;
              }
        
              // Check if projectId is provided
              if (payload?.projectId) {
                // Check if URL already contains parameters
                url += url.includes('?')
                  ? `&projectId=${payload?.projectId}`
                  : `?projectId=${payload?.projectId}`;
              }
              console.log('the url is this : ', url);
            }
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.get(url,options)
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
  organisationListApi() {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.get(`${this.apiUrl}/organisation/organisationList`,options)
  }
  organisationCreateApi(payload : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.post(`${this.apiUrl}/organisation/createOrganisation`,payload, options)
  }
  organisationUpdateApi(payload : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.patch(`${this.apiUrl}/organisation/updateOrganisation`,payload, options)
  }
  organisationDeleteApi(requestId : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.delete(`${this.apiUrl}/organisation/deleteOrganisation?organisationId=${requestId}`,options)
  }
  teamListApi(organisationId: string) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.get(`${this.apiUrl}/team/teamList?organisationId=${organisationId}`,options)
  }
  teamCreateApi(payload : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.post(`${this.apiUrl}/team/createTeam`,payload, options)
  }
  teamUpdateApi(payload : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.patch(`${this.apiUrl}/team/updateTeam`,payload, options)
  }
  teamDeleteApi(requestId : any) {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    console.log("The current user is this : ", currentUser);
    const headers = new HttpHeaders({
      'Authentication': `${currentUser.token}` // Set your header value here
    });
    const options = { headers: headers };
    return this.api.delete(`${this.apiUrl}/team/deleteTeam?teamId=${requestId}`,options)
  }
}
