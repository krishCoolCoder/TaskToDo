// import { Injectable } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
// import { Component, SimpleChanges } from '@angular/core';
// import { ApiService } from '../service/api.service';
import { catchError, map } from 'rxjs/operators';
// import { Api } from '../dependancy/apiService.service';

@Injectable()
export class ApiCall {
    constructor(private api : HttpClient) { };
    apiUrl = 'https://backend.tasktodo.app';
    taskListApi(payload : any = null){
        return new Promise((res,rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user from the api is this : ", currentUser)
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            let url = `${this.apiUrl}/task/taskList`;
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
            this.api.get(url, options).pipe(
                map((response: any) => {
                  console.log("queries.component.ts says that response is this : ", response);
                //   this.listData = response?.data;
                //   this.noData = response?.data.length === 0 ? true : false; 
                  res(response?.data)
                  // return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  // this.noData = this.response?.data.length === 0 ? true : false; 
                  alert(error.error.message || error.statusText)
                  rej(error)
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
        })
    }
    taskDeleteApi(projectId : string){
        return new Promise((res,rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            this.api.delete(`${this.apiUrl}/task/deleteTask?taskId=${projectId}`, options).pipe(
                map((response: any) => {
                  console.log("queries.component.ts says that response is this : ", response);
                  res(response)
                //   this.listData = response?.data;
                //   this.noData = response?.data.length === 0 ? true : false; 
          
                  // this.noData = response.data.length === 0 ? true : false;
                  // this.taskList = response?.data
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  // this.noData = this.response?.data.length === 0 ? true : false; 
                  alert(error.error.message || error.statusText);
                  rej(error)
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
        })
    }
    taskPostApi(payload : any) {
        return new Promise ( (res, rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            this.api.post(`${this.apiUrl}/task/createTask`,payload, options).pipe(
                map((response: any) => {
                  console.log("The response of the api is this : ", response);
                //   this.outputValue.emit({data: response});
                res(response?.data)
                  // this.noData = response.data.length === 0 ? true : false;
                  // this.taskList = response?.data
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  alert(error.error.message || error.statusText)
                    // this.outputValue.emit({data: "response"});
                  rej(error)
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
        })
    }
    taskPatchApi(payload : any) {
        return new Promise ( (res, rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            return this.api.patch(`${this.apiUrl}/task/updateTask`,payload, options).pipe(
                map((response: any) => {
                  console.log("The response of the api is this : ", response);
                //   this.outputValue.emit({data: response});
                res(response?.data)
                  // this.noData = response.data.length === 0 ? true : false;
                  // this.taskList = response?.data
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  alert(error.error.message || error.statusText)
                    // this.outputValue.emit({data: "response"});
                  rej(error)
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
        })
    }
    taskAssignPatchApi(payload : any) {
        return new Promise ( (res, rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            return this.api.patch(`${this.apiUrl}/task/assignTask`,payload, options).pipe(
                map((response: any) => {
                  console.log("The response of the api is this : ", response);
                //   this.outputValue.emit({data: response});
                res(response?.data)
                  // this.noData = response.data.length === 0 ? true : false;
                  // this.taskList = response?.data
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  alert(error.error.message || error.statusText)
                    // this.outputValue.emit({data: "response"});
                  rej(error)
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
        })
    }
    queryListApi(payload : any = null){
        return new Promise((res,rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            let url = `${this.apiUrl}/query/queryList`;
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
            this.api.get(url, options).pipe(
                map((response: any) => {
                  console.log("queries.component.ts says that response is this : ", response);
                //   this.listData = response?.data;
                //   this.noData = response?.data.length === 0 ? true : false; 
                  res(response?.data)
                  // return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  // this.noData = this.response?.data.length === 0 ? true : false; 
                  alert(error.error.message || error.statusText)
                  rej(error)
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
        })
    }
    queryDeleteApi(projectId : string){
        return new Promise((res,rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            this.api.delete(`${this.apiUrl}/query/deleteQuery?queryId=${projectId}`, options).pipe(
                map((response: any) => {
                  console.log("queries.component.ts says that response is this : ", response);
                  res(response)
                //   this.listData = response?.data;
                //   this.noData = response?.data.length === 0 ? true : false; 
          
                  // this.noData = response.data.length === 0 ? true : false;
                  // this.taskList = response?.data
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  // this.noData = this.response?.data.length === 0 ? true : false; 
                  alert(error.error.message || error.statusText);
                  rej(error)
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
        })
    }
    queryPostApi(payload : any) {
        return new Promise ( (res, rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            this.api.post(`${this.apiUrl}/task/createTask`,payload, options).pipe(
                map((response: any) => {
                  console.log("The response of the api is this : ", response);
                //   this.outputValue.emit({data: response});
                res(response?.data)
                  // this.noData = response.data.length === 0 ? true : false;
                  // this.taskList = response?.data
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  alert(error.error.message || error.statusText)
                    // this.outputValue.emit({data: "response"});
                  rej(error)
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
        })
    }
    queryPatchApi(payload : any) {
        return new Promise ( (res, rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            return this.api.patch(`${this.apiUrl}/task/updateTask`,payload, options).pipe(
                map((response: any) => {
                  console.log("The response of the api is this : ", response);
                //   this.outputValue.emit({data: response});
                res(response?.data)
                  // this.noData = response.data.length === 0 ? true : false;
                  // this.taskList = response?.data
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  alert(error.error.message || error.statusText)
                    // this.outputValue.emit({data: "response"});
                  rej(error)
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
        })
    }
    requestListApi(payload : any = null){
        return new Promise((res,rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            let url = `${this.apiUrl}/request/requestList`;
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
            this.api.get(url, options).pipe(
                map((response: any) => {
                  console.log("queries.component.ts says that response is this : ", response);
                //   this.listData = response?.data;
                //   this.noData = response?.data.length === 0 ? true : false; 
                  res(response?.data)
                  // return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  // this.noData = this.response?.data.length === 0 ? true : false; 
                  alert(error.error.message || error.statusText)
                  rej(error)
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
        })
    }
    requestDeleteApi(projectId : string){
        return new Promise((res,rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            this.api.delete(`${this.apiUrl}/request/deleteRequest?requestId=${projectId}`, options).pipe(
                map((response: any) => {
                  console.log("queries.component.ts says that response is this : ", response);
                  res(response)
                //   this.listData = response?.data;
                //   this.noData = response?.data.length === 0 ? true : false; 
          
                  // this.noData = response.data.length === 0 ? true : false;
                  // this.taskList = response?.data
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  // this.noData = this.response?.data.length === 0 ? true : false; 
                  alert(error.error.message || error.statusText);
                  rej(error)
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
        })
    }
    requestPostApi(payload : any) {
        return new Promise ( (res, rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            this.api.post(`${this.apiUrl}/request/createRequest`,payload, options).pipe(
                map((response: any) => {
                  console.log("The response of the api is this : ", response);
                //   this.outputValue.emit({data: response});
                res(response?.data)
                  // this.noData = response.data.length === 0 ? true : false;
                  // this.taskList = response?.data
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  alert(error.error.message || error.statusText)
                    // this.outputValue.emit({data: "response"});
                  rej(error)
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
        })
    }
    requestPatchApi(payload : any) {
        return new Promise ( (res, rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            return this.api.patch(`${this.apiUrl}/request/updateRequest`,payload, options).pipe(
                map((response: any) => {
                  console.log("The response of the api is this : ", response);
                //   this.outputValue.emit({data: response});
                res(response?.data)
                  // this.noData = response.data.length === 0 ? true : false;
                  // this.taskList = response?.data
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  alert(error.error.message || error.statusText)
                    // this.outputValue.emit({data: "response"});
                  rej(error)
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
        })
    }
    userListApi(payload : any = null){
        return new Promise((res,rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            let url = `${this.apiUrl}/user/userList`;
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
            this.api.get(`${this.apiUrl}/user/userList`, options).pipe(
                map((response: any) => {
                  console.log("queries.component.ts says that response is this : ", response);
                //   this.listData = response?.data;
                //   this.noData = response?.data.length === 0 ? true : false; 
                  res(response?.data)
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  // this.noData = this.response?.data.length === 0 ? true : false; 
                  alert(error.error.message || error.statusText)
                  rej(error)
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
        })
    }
    userDeleteApi(userId : string){
        return new Promise((res,rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            this.api.delete(`${this.apiUrl}/user/deleteUser?taskId=${userId}`, options).pipe(
                map((response: any) => {
                  console.log("queries.component.ts says that response is this : ", response);
                  res(response)
                //   this.listData = response?.data;
                //   this.noData = response?.data.length === 0 ? true : false; 
          
                  // this.noData = response.data.length === 0 ? true : false;
                  // this.taskList = response?.data
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  // this.noData = this.response?.data.length === 0 ? true : false; 
                  alert(error.error.message || error.statusText);
                  rej(error)
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
        })
    }
    userPostApi(payload : any) {
        return new Promise ( (res, rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            this.api.post(`${this.apiUrl}/user/createUser`,payload, options).pipe(
                map((response: any) => {
                  console.log("The response of the api is this : ", response);
                //   this.outputValue.emit({data: response});
                res(response?.data)
                  // this.noData = response.data.length === 0 ? true : false;
                  // this.taskList = response?.data
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  alert(error.error.message || error.statusText)
                    // this.outputValue.emit({data: "response"});
                  rej(error)
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
        })
    }
    userPatchApi(payload : any) {
        return new Promise ( (res, rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            return this.api.patch(`${this.apiUrl}/user/updateUser`,payload, options).pipe(
                map((response: any) => {
                  console.log("The response of the api is this : ", response);
                //   this.outputValue.emit({data: response});
                res(response?.data)
                  // this.noData = response.data.length === 0 ? true : false;
                  // this.taskList = response?.data
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  alert(error.error.message || error.statusText)
                    // this.outputValue.emit({data: "response"});
                  rej(error)
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
        })
    }
    projectListApi(){
        return new Promise((res,rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            this.api.get(`${this.apiUrl}/project/projectList`, options).pipe(
                map((response: any) => {
                  console.log("queries.component.ts says that response is this : ", response);
                //   this.listData = response?.data;
                //   this.noData = response?.data.length === 0 ? true : false; 
                  res(response?.data)
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  // this.noData = this.response?.data.length === 0 ? true : false; 
                  alert(error.error.message || error.statusText)
                  rej(error)
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
        })
    }
    projectDeleteApi(projectId : string){
        return new Promise((res,rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            this.api.delete(`${this.apiUrl}/project/deleteProject?taskId=${projectId}`, options).pipe(
                map((response: any) => {
                  console.log("queries.component.ts says that response is this : ", response);
                  res(response)
                //   this.listData = response?.data;
                //   this.noData = response?.data.length === 0 ? true : false; 
          
                  // this.noData = response.data.length === 0 ? true : false;
                  // this.taskList = response?.data
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  // this.noData = this.response?.data.length === 0 ? true : false; 
                  alert(error.error.message || error.statusText);
                  rej(error)
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
        })
    }
    projectPostApi(payload : any) {
        return new Promise ( (res, rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            this.api.post(`${this.apiUrl}/project/createProject`,payload, options).pipe(
                map((response: any) => {
                  console.log("The response of the api is this : ", response);
                //   this.outputValue.emit({data: response});
                res(response?.data)
                  // this.noData = response.data.length === 0 ? true : false;
                  // this.taskList = response?.data
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  alert(error.error.message || error.statusText)
                    // this.outputValue.emit({data: "response"});
                  rej(error)
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
        })
    }
    projectPatchApi(payload : any) {
        return new Promise ( (res, rej)=>{
            let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
            console.log("The current user is this : ", currentUser);
            const headers = new HttpHeaders({
            'Authentication': `${currentUser.token}` // Set your header value here
            });
            const options = { headers: headers };
            return this.api.patch(`${this.apiUrl}/project/updateProject`,payload, options).pipe(
                map((response: any) => {
                  console.log("The response of the api is this : ", response);
                //   this.outputValue.emit({data: response});
                res(response?.data)
                  // this.noData = response.data.length === 0 ? true : false;
                  // this.taskList = response?.data
                  return response; // Forward the response to the next operator
                }),
                catchError((error) => {
                  // Handle error response here
                  console.error('API Error:', error);
                  alert(error.error.message || error.statusText)
                    // this.outputValue.emit({data: "response"});
                  rej(error)
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
        })
    }
}