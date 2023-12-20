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
    TaskComponentComponent
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
