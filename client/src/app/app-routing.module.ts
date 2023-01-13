import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as path from 'path';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { BasicLayoutComponent } from './shared/layouts/basic-layout/basic-layout.component';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
