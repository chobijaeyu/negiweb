import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
@Component({
  selector: 'negi-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  logout(){

  }
}
