import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'negi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  constructor(
    public af: AngularFireAuth,
    private fb: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.af.user.subscribe(u => {
      if (u) {
        this.router.navigateByUrl("")
      }
    })
  }

  lineLogin() {
    let url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${environment.LineLoginChannelID}&redirect_uri=${environment.redirect_uri}/line&state=12345abcde&scope=profile%20openid%20email&nonce=${environment.nonce}`
    window.open(url, "lineLogin", "menubar=1,resizable=1,")
  }
  logout(){
    this.af.signOut()
  }
}
