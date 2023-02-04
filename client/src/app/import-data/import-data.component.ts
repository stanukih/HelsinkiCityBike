import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import {StantionService} from '../shared/services/stantion.service'
import { Router } from '@angular/router';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent {
  constructor(private stantionService:StantionService, private router: Router){
    this.stantionsFileName = null
    this.travelsFileName = null
  }
  stantionsFileName: File | null
  travelsFileName: File | null
  subs!:Subscription
  importStantions(event: Event) {

    const target = event.target as HTMLInputElement
    if (target.files) {
      this.stantionsFileName = target.files[0]
    }
    /*console.log("this.stantionsFileName=",this.stantionsFileName)
    console.log("this.travelsFileName",this.travelsFileName)*/
  }
  importTravels(event: Event) {

    const target = event.target as HTMLInputElement
    if (target.files) {
      this.travelsFileName = target.files[0]
    }
    /*console.log("this.stantionsFileName=",this.stantionsFileName)
    console.log("this.travelsFileName",this.travelsFileName)*/
  }
  sendStantions() {
    if (this.stantionsFileName === null) {
      alert("Select file to packet upload")
      return
    }
    this.subs=this.stantionService.stantion_packet_add(this.stantionsFileName).subscribe(
      resp => {
        if (resp["status_add"]==="success"){
          alert(resp["message"])
          this.router.navigate(['/stantion'])
        }
        else{
          
        }        
      },
      e=>{
        alert("File not loaded. The file must be in csv format and no more than 250 MB")
      }      
    )
    this.subs.unsubscribe
  }
  sendTravel() {
    if (this.stantionsFileName === null) {
      alert("Select file to packet upload")
      return
    }
  }
}

