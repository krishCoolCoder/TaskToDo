import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UnderDevelopmentComponent } from './under-development/under-development.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TaskComponentComponent } from './task-component/task-component.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { TasksComponent } from './tasks/tasks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestComponent } from './request/request.component';
import { QueriesComponent } from './queries/queries.component';
import { PerformanceComponent } from './performance/performance.component';
import { AddTaskModelComponent } from './model/add-task-model/add-task-model.component';
import { AddRequestModelComponent } from './model/add-request-model/add-request-model.component';
import { AddQueryModelComponent } from './model/add-query-model/add-query-model.component';

const routeConfig: Routes = [
  {
    path: "",
    component: HomePageComponent,
  },
  {
    path: "features",
    component: UnderDevelopmentComponent,
  },
  {
    path: "contactUs",
    component: UnderDevelopmentComponent,
  },
  {
    path: "aboutUs",
    component: UnderDevelopmentComponent,
  },
  {
    path: "signIn",
    component: SignInComponent,
  },
  {
    path: "tasks",
    component: TaskComponentComponent,
  },
  {
    path: "taskList",
    component: TasksComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "request",
    component: RequestComponent,
  },
  {
    path: "queries",
    component: QueriesComponent,
  },
  {
    path: "performance",
    component: QueriesComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    HomePageComponent,
    UnderDevelopmentComponent,
    SignInComponent,
    TaskComponentComponent,
    TaskListComponent,
    SidebarMenuComponent,
    TasksComponent,
    DashboardComponent,
    RequestComponent,
    QueriesComponent,
    PerformanceComponent,
    AddTaskModelComponent,
    AddRequestModelComponent,
    AddQueryModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routeConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
