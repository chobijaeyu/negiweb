import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterOutlet, Router } from '@angular/router';
@Component({
  selector: 'negi-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  constructor(
    public afa: AngularFireAuth,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  logout() {
    this.afa.signOut().finally(() => {
      this.router.navigateByUrl("/auth")
    })
  }
}
