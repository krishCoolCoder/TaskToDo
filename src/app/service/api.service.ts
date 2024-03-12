import { Injectable } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'https://backend.tasktodo.app';

  constructor(private api : HttpClient) { }

  loginApi(payload: any) {
    return this.api.post(`${this.apiUrl}/login`,payload);
  }
}
