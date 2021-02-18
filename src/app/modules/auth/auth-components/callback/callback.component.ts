import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { authorizationCode } from "src/app/models/line.model";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'negi-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CallbackComponent implements OnInit {

  constructor(
    private af: AngularFireAuth,
    private route: ActivatedRoute,
    private h: HttpClient
  ) { }

  ngOnInit(): void {
    let code = this.route.snapshot.queryParamMap.get("code")
    this.LineGettingAccessToken(code!).pipe(
      switchMap(at => this.LineGettingFirebaseCustomTokens(at)),
    ).subscribe(
      customToken => {
        console.log(customToken)
        this.af.signInWithCustomToken(customToken).finally(() => window.close())
      }
    )
  }

  LineGettingAccessToken(code: string): Observable<authorizationCode> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let options = { headers: headers };
    let body = `grant_type=authorization_code&code=${code}&redirect_uri=${environment.redirect_uri}/line&client_id=${environment.LineLoginChannelID}&client_secret=${environment.LineLoginChannelSecret}`;
    return this.h.post<authorizationCode>("https://api.line.me/oauth2/v2.1/token", body, options)
  }

  LineGettingFirebaseCustomTokens(at: authorizationCode): Observable<string> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text'
    }
    return this.h.post<string>(environment.firebaseLineFuncURL, at, requestOptions)
  }

}
