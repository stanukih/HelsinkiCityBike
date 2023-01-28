import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Travel } from "./interfaces";


export interface travelminimal{
    departure_time:number,
    id:number,
    nimi:string,
    namn:string,
    name:string,
    osoite:string,
    adress:string,
    kaupunki?:string,
    stad?:string,
    operaattor?:string,
    kapasiteet:number,
    positionX:number,
    positionY:number
}

export interface resJSON{
    status_add:string,
    codeFailed?:Number,
    message?:string,
    record?:JSON
}


@Injectable({
    providedIn:'root'
})
export class TravelService {
    constructor(private http:HttpClient){

    }

    fetch(page:number=1, size:number=100, sort:string='', filter:string='',fields:string=''):Observable<Travel[]>{
        return this.http.get<Travel[]>(`/api/travel/travel?page=${page}&size=${size}&sort=${sort}&filter=${filter}&fields=${fields}`)
    }
    stantion_quantity(filter:string=''):Observable<number>{
        return this.http.get<number>(`/api/travel/travel_quantity?filter=${filter}`)
    }
    
}