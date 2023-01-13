import { Injectable } from "@angular/core";
import { AuthUser } from "./interfaces";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { ActivatedRoute,Params,Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Injectable({
    providedIn:'root'
})
export class AuthService{

    private token:string|null = null

    constructor(private http:HttpClient){

    }
    register(user:AuthUser):Observable<AuthUser>{
        return this.http.post<AuthUser>('/api/auth/register', user)
    }
    login(user:AuthUser):Observable<{token:string}>{
        return this.http.post<{token:string}>("/api/auth/login", user)
        .pipe(
            tap(
                ({token})=>{
            localStorage.setItem('auth-token', token)
            this.setToken(token)
        }))        
    }

    setToken(token:string|null){
        this.token = token
    }
    getToken():string{
        if (this.token){
        return this.token} else{return ''}
    }

    isAuthenticated():boolean{
        return !!this.token
    }

    logout(){
        this.setToken(null)
        localStorage.clear()
    }

}