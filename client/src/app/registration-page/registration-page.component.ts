import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit, OnDestroy {
  form!: FormGroup
  
  
  aSub!:Subscription
  constructor(public router:Router, public activRout:ActivatedRoute, public auth:AuthService){

  }

  ngOnDestroy(): void {
    if (this.aSub){
    this.aSub.unsubscribe()
    }
  }

  ngOnInit(){
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(),
    })            
    }
    onSubmit(){
      this.form.disable()
      console.log(this.form)
      this.auth.register(this.form.value).subscribe(
        (value)=>{
          this.router.navigate(['/login'],{
            queryParams:{
              registered:true
            }
          })
      },
        (error)=>{
          console.log(error);
          this.form.enable()
        }
      )
    }

}
