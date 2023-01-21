import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BasicLayoutComponent } from './shared/layouts/basic-layout/basic-layout.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { TokenInterseptor } from './shared/classes/token.interseptor';
import { StationsPageComponent } from './stations-page/stations-page.component';
import { TravelPageComponent } from './travel-page/travel-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator'
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    
    AppComponent,
    AuthLayoutComponent,
    LoginPageComponent,
    BasicLayoutComponent,
    RegistrationPageComponent,
    StationsPageComponent,
    TravelPageComponent
  ],
  imports: [
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi:true,
    useClass:TokenInterseptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
