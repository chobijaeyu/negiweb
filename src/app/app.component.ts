import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'negi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'negiweb';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {

    ReactiveFormConfig.autoInstancePush = true;
    ReactiveFormConfig.set({ "validationMessage": { "required": "必須です" } });

    this._registry("auth-line", "../assets/svg/line.svg")
    this._registry("negi-logo", "../assets/svg/logo.svg")
    this._registry("arrow-left", "../assets/svg/arrow-left.svg")
    this._registry("arrow-right", "../assets/svg/arrow-right.svg")
    this._registry("refresh", "../assets/svg/refresh.svg")
    this._registry("add", "../assets/svg/add.svg")
  }

  _registry(name: string, path: string) {
    this.matIconRegistry.addSvgIcon(name, this.domSanitizer.bypassSecurityTrustResourceUrl(path))
  }
}
