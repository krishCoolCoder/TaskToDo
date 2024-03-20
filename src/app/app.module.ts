import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UnderDevelopmentComponent } from './under-development/under-development.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TaskComponentComponent } from './task-component/task-component.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestComponent } from './request/request.component';
import { QueriesComponent } from './queries/queries.component';
import { PerformanceComponent } from './performance/performance.component';
import { AddTaskModelComponent } from './model/add-task-model/add-task-model.component';
import { AddRequestModelComponent } from './model/add-request-model/add-request-model.component';
import { AddQueryModelComponent } from './model/add-query-model/add-query-model.component';
import { UserDataComponent } from './user-data/user-data.component';
import { AddUserModelComponent } from './model/add-user-model/add-user-model.component';
import { TaskToDoComponent } from './task-to-do/task-to-do.component';
import { TodoComponent } from './todo/todo.component';
import { AddOrganisationModelComponent } from './model/add-organisation-model/add-organisation-model.component';
import { AddTeamModelComponent } from './model/add-team-model/add-team-model.component';
import { AddTodoModelComponent } from './model/add-todo-model/add-todo-model.component';
import { ApiService } from './service/api.service';

import { HttpClientModule } from '@angular/common/http';
import { EditOrganisationModelComponent } from './model/edit-organisation-model/edit-organisation-model.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { TeamComponent } from './team/team.component';
import { EditTeamModelComponent } from './model/edit-team-model/edit-team-model.component';
import { UpdateTaskStatusModelComponent } from './model/update-task-status-model/update-task-status-model.component';

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
    component: TaskToDoComponent,
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
    path: "todoList",
    component: TodoComponent,
  },
  {
    path: "user",
    component: UserDataComponent,
  },
  {
    path: "organisation",
    component: OrganisationComponent,
  },
  {
    path: "team",
    component: TeamComponent,
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
    SidebarMenuComponent,
    DashboardComponent,
    RequestComponent,
    QueriesComponent,
    PerformanceComponent,
    AddTaskModelComponent,
    AddRequestModelComponent,
    AddQueryModelComponent,
    UserDataComponent,
    AddUserModelComponent,
    TaskToDoComponent,
    TodoComponent,
    AddOrganisationModelComponent,
    AddTeamModelComponent,
    AddTodoModelComponent,
    EditOrganisationModelComponent,
    OrganisationComponent,
    TeamComponent,
    EditTeamModelComponent,
    UpdateTaskStatusModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routeConfig),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent,ApiService]
})
export class AppModule { }
