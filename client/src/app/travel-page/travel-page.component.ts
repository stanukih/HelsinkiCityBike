import { Component, OnInit } from '@angular/core';
import { Travel } from '../shared/services/interfaces';
import { TravelService } from '../shared/services/travel.service';
import {PageEvent} from '@angular/material/paginator';
import { Subscription } from 'rxjs';



interface ISortField {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-travel-page',
  templateUrl: './travel-page.component.html',
  styleUrls: ['./travel-page.component.scss']
})
export class TravelPageComponent implements OnInit{
  constructor(private travelService:TravelService){
    this.showFirstLastButtons = true
    this.length=0
    this.pageSize=25
    this.pageSizeOptions=[25, 50, 100]
    this.pageIndex=0
    this.sortFields=[    
      {value: '0', viewValue: 'departure_time'},
      {value: '1', viewValue: 'return_time'},
      {value: '2', viewValue: 'departure_station_id'},
      {value: '3', viewValue: 'departure_station_name'},
      {value: '4', viewValue: 'return_station_id'},
      {value: '5', viewValue: 'return_station_name'},
      {value: '6', viewValue: 'distance'},
      {value: '7', viewValue: 'duration'}
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
  dataSource:Travel[]=[]
  pageEvent!: PageEvent;
  pageIndex:number=0
  length: number=0
  pageSize: number=0
  pageSizeOptions!: number[]
  selectedSortField!:string
  selectedFilterField!:string
  selectedOperatorField!:string
  selectedFieldToReq:string[]=[]
  operator:ISortField[]
  filterInput!:string
  subs!:Subscription
  showFirstLastButtons:boolean;
  
  
  onPaginate(pageEvent: PageEvent) {    
    this.pageIndex=pageEvent.pageIndex
    this.pageSize = pageEvent.pageSize;
    this.loadData()
  }
  
  loadData():void{
    this.displayedColumns=[]
    for (let index = 0; index < this.selectedFieldToReq.length; index++) {
      this.displayedColumns[index] = this.fieldFromid(this.selectedFieldToReq[index])
    }
    let filter:string
    if ((this.selectedFilterField)&& (this.selectedOperatorField)&&(this.filterInput)){
      filter=''.concat(String(this.fieldsInTheTable.indexOf(this.selectedFilterField)),"_", this.selectedOperatorField,"_",this.filterInput)}
    else {
      filter=''
    }

    this.subs=this.travelService.stantion_quantity(filter).subscribe(stantion_quantity =>{    
      this.length=stantion_quantity
      
    })    
    this.subs.unsubscribe
    this.subs=this.travelService.fetch(this.pageIndex+1,this.pageSize,this.selectedSortField,filter,this.sumFiledsToReq()).subscribe(      
      travel =>{      
      this.dataSource=travel
    },
    error =>{
      this.dataSource=[]
    }
    )
    this.subs.unsubscribe
  }


  ngOnInit(): void {
    
  }

  createParamFieldsToReq(selectedFieldToReq:string[]):string {
    if (selectedFieldToReq.length<1)    {
      return ''
    }
    let ParamFieldsToReq:string='' 
    for (let index = 0; index < this.fieldsInTheTable.length; index++) {
      if (!(selectedFieldToReq.includes(this.fieldsInTheTable[index]))) {
        ParamFieldsToReq += String(index);
      }
    }        
    return ParamFieldsToReq
  }  

  displayedColumns: string[] =[];
  fieldsInTheTable:string[]= [
    "departure_time",
    "return_time",
    "departure_station_id",
    "departure_station_name",
    "return_station_id",
    "return_station_name",
    "distance",
    "duration",
  ]
  sumFiledsToReq(){
    let filedsToSort:string=''
    for (let index = 0; index < this.selectedSortField.length; index++) {
      filedsToSort+= this.selectedSortField[index]      
    }
    return filedsToSort
  }

  fieldFromid(id:string){
    switch (id) {
      case "0":
      return "departure_time"
      case "1":
        return"return_time"
      case "2":
        return "departure_station_id"
      case "3":
        return "departure_station_name"
      case "4":
        return "return_station_id"
      case "5":
        return "return_station_name"
      case "6":
        return "distance"
      case "7":
        return "duration"
      default:
        throw new Error("Udefaund key travel page"+id)
      }
    }  
}
