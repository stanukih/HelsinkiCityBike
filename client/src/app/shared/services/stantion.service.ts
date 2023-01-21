import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Stantion } from "./interfaces";

@Injectable({
    providedIn:'root'
})
export class StantionService {
    constructor(private http:HttpClient){

    }

    fetch(page:number=1, size:number=100, sort:string='', filter:string=''):Observable<Stantion[]>{
        return this.http.get<Stantion[]>(`/api/stantion/stantion?page=${page}&size=${size}&sort=${sort}&filter=${filter}`)
    }
    stantion_quantity(filter:string=''):Observable<number>{
        return this.http.get<number>(`/api/stantion/stantion_quantity?filter=${filter}`)
    }
    
}