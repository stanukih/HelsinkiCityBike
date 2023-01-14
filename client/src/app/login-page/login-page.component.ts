import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {



  constructor(private router: Router, private activRout: ActivatedRoute, private auth: AuthService) { }

  form!: FormGroup
  aSub!: Subscription

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }


  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(),
    })
    this.activRout.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        //Вы уже авторизованы        
      }
      else if (params['accessDenied']){}

    })
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['stations'])
      },
      error => {
        console.log(error);
        this.form.enable()

      }
    )
  }
}
