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
//import { MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { StantionAddPageComponent } from './stantion-add-page/stantion-add-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card';
import { ImportDataComponent } from './import-data/import-data.component' 
//import { MatHint } from '@angular/material/form-field';
//import { MatLabel } from '@angular/material/form-field';



@NgModule({
  declarations: [
    
    AppComponent,
    AuthLayoutComponent,
    LoginPageComponent,
    BasicLayoutComponent,
    RegistrationPageComponent,
    StationsPageComponent,
    TravelPageComponent,
    StantionAddPageComponent,
    ImportDataComponent
  ],
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
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
