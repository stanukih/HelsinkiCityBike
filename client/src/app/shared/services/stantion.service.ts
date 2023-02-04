import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Stantion } from "./interfaces";


export interface stantionminimal {
    fid: number,
    id: number,
    nimi: string,
    namn: string,
    name: string,
    osoite: string,
    adress: string,
    kaupunki?: string,
    stad?: string,
    operaattor?: string,
    kapasiteet: number,
    positionX: number,
    positionY: number
}

export interface resJSON {
    status_add: string,
    codeFailed?: Number,
    message?: string,
    record?: JSON
}


@Injectable({
    providedIn: 'root'
})
export class StantionService {
    constructor(private http: HttpClient) {

    }

    fetch(page: number = 1, size: number = 100, sort: string = '', filter: string = '', fields: string = ''): Observable<Stantion[]> {
        return this.http.get<Stantion[]>(`/api/stantion/stantion?page=${page}&size=${size}&sort=${sort}&filter=${filter}&fields=${fields}`)
    }
    stantion_quantity(filter: string = ''): Observable<number> {
        return this.http.get<number>(`/api/stantion/stantion_quantity?filter=${filter}`)
    }

    stantion_add(data: stantionminimal) {
        return this.http.post<resJSON>(`/api/stantion/add_stantion_one`, data)
    }
    stantion_packet_add(file: File) {
        const formData: FormData = new FormData();
        formData.append("filedata", file);

        return this.http.post<resJSON>(`/api/stantion/import_stantions`, formData)
    }

    travel_packet_add(file: File) {
        const formData: FormData = new FormData();
        formData.append("filedata", file);

        return this.http.post<resJSON>(`/api/travel/import_travels`, formData)
    }
}