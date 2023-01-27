import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as path from 'path';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { BasicLayoutComponent } from './shared/layouts/basic-layout/basic-layout.component';
import { StationsPageComponent } from './stations-page/stations-page.component';
import { TravelPageComponent } from './travel-page/travel-page.component';
import { StantionAddPageComponent } from './stantion-add-page/stantion-add-page.component';

const routes: Routes = [
  {
    path: "", component: AuthLayoutComponent, children:[{
      path:"login", component:LoginPageComponent
    },
    {
      path:"registration", component:RegistrationPageComponent
    },
    {
      path:"", redirectTo: "/login", pathMatch: "full"
    },
      
    ]
  },
  {
    path: "", component: BasicLayoutComponent,canActivate:[AuthGuard], children:[
    {
      path: "stantion", component: StationsPageComponent
    },
    {
      path:"travel", component: TravelPageComponent
    },
    {
      path: "stantion_add", component: StantionAddPageComponent
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
