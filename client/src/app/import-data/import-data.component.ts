import { Component } from '@angular/core';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent {
  importStantions(file:string){
    console.log(file)
    console.log(typeof file)
  }
  importTravels(file:string){
    console.log(file)
    console.log(typeof file)
  }

}
