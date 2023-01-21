import { Component } from '@angular/core';
import {} from '@angular/cdk'
import {MatMenuModule} from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatMenu } from '@angular/material/menu'; 

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.scss']
})
export class BasicLayoutComponent {

  Info!:MatMenu
  Admin!:MatMenu
  matMenuTriggerFor!:MatMenuTrigger


}
