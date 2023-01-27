import { Component } from '@angular/core';
import { stantionminimal, StantionService } from '../shared/services/stantion.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stantion-add-page',
  templateUrl: './stantion-add-page.component.html',
  styleUrls: ['./stantion-add-page.component.scss']
})
export class StantionAddPageComponent {
  constructor(private router: Router, private stantionService:StantionService){
    this.dataToAddStantion={
      fid:0,
      id:0,
      nimi:"",
      namn:"",
      name:"",
      osoite:"",
      adress:"",
      kaupunki:"",
      stad:"",
      operaattor:"",
      kapasiteet:0,
      positionX:0.0,
      positionY:0.0
    }
  }
  subs!:Subscription
  dataToAddStantion: stantionminimal
  addStantion(){
    //console.log()
    this.subs=this.stantionService.stantion_add(this.dataToAddStantion).subscribe(
      resp => {
        if (resp["status_add"]==="success"){
          alert("Record add success")
          this.router.navigate(['/stantion'])
        }
        else{
          console.log(resp)

        }
        this.subs.unsubscribe
      },
      e => {
        let ErrorMessage:string=e.error.message
        if (e.error.codeFailed===1020){
        ErrorMessage+="\n"+JSON.stringify(e.error.record)
      }
      alert(ErrorMessage)
        this.subs.unsubscribe
      }

    )
  }

}
