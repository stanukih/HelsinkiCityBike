import { Component, OnInit } from '@angular/core';
import { Stantion } from '../shared/services/interfaces';
import { StantionService } from '../shared/services/stantion.service';
import {PageEvent,MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';



interface ISortField {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-stations-page',
  templateUrl: './stations-page.component.html',
  styleUrls: ['./stations-page.component.scss']
})
export class StationsPageComponent implements OnInit{
  constructor(private stantionService:StantionService){
    this.length=0
    this.pageSize=25
    this.pageSizeOptions=[25, 50, 100]
    this.pageIndex=0
    this.sortFields=[    
      {value: 'fid', viewValue: 'fid'},
      {value: 'id', viewValue: 'id'},
      {value: 'nimi', viewValue: 'nimi'},
      {value: 'namn', viewValue: 'namn'},
      {value: 'name', viewValue: 'name'},
      {value: 'osoite', viewValue: 'osoite'},
      {value: 'adress', viewValue: 'adress'},
      {value: 'kaupunki', viewValue: 'kaupunki'},
      {value: 'stad', viewValue: 'stad'},
      {value: 'operaattor', viewValue: 'operaattor'},
      {value: 'kapasiteet', viewValue: 'kapasiteet'},
      {value: 'positionX', viewValue: 'positionX'},
      {value: 'positionY', viewValue: 'positionY'},
    ]
    this.operator=[
      {value: '1', viewValue: 'equals'},                  //=
      {value: '2', viewValue: 'unequal'},                 //!=
      {value: '3', viewValue: 'greater than or equal'},  //>=
      {value: '4', viewValue: 'less than or equal'},     //<=
      {value: '5', viewValue: 'greater than'},            //>
      {value: '6', viewValue: 'less'},                    //<
      {value: '7', viewValue: 'contains'},                    //<
      {value: '8', viewValue: 'not contains'},                    //<
    ]
  }

  sortFields:ISortField[]
  dataSource!:Stantion[]
  pageEvent!: PageEvent;
  pageIndex!:number
  length!: number
  pageSize!: number
  pageSizeOptions!: number[]
  selectedSortField!:string
  selectedFilterField!:string
  selectedOperatorField!:string
  operator:ISortField[]
  filterInput!:string
  subs!:Subscription
  
  
  onPaginate(pageEvent: PageEvent) {    
    this.pageIndex=pageEvent.pageIndex
    this.pageSize = pageEvent.pageSize;
    this.stantionService.fetch(this.pageIndex+1,this.pageSize).subscribe(stantion =>{      
      this.dataSource=stantion
    })
  }
  
  loadData():void{
    let filter:string
    if ((this.selectedFilterField)&& (this.selectedOperatorField)&&(this.filterInput)){
      filter=''.concat(this.selectedFilterField,"_", this.selectedOperatorField,"_",this.filterInput)}
    else {
      filter=''
    }

    this.subs=this.stantionService.stantion_quantity(filter).subscribe(stantion_quantity =>{    
      this.length=stantion_quantity
      
    })
    this.subs.unsubscribe
    this.subs=this.stantionService.fetch(this.pageIndex+1,this.pageSize,this.selectedSortField,filter).subscribe(
      stantion =>{      
      this.dataSource=stantion
    },
    error =>{
      this.dataSource=[]
    }
    )
    this.subs.unsubscribe

  }


  ngOnInit(): void {
    
  }

  

  displayedColumns: string[] = [
    "fid",
  "id",
  "nimi",
  "namn",
  "name",
  "osoite",
  "adress",
  "kaupunki",
  "stad",
  "operaattor",
  "kapasiteet",
  "positionX",
  "positionY"
  ];
  
  

  
}
