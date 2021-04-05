import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'negi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'negiweb';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this._registry("auth-line", "../assets/svg/line.svg")
  }

  ngOnInit(){

    ReactiveFormConfig.autoInstancePush = true;
    ReactiveFormConfig.set({ "validationMessage": { "required": "必須です" } });
  }

  _registry(name: string, path: string) {
    this.matIconRegistry.addSvgIcon(name, this.domSanitizer.bypassSecurityTrustResourceUrl(path))
  }
}
