import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'negi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'negiweb';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this._registry("auth-line", "../assets/svg/line.svg")
  }

  _registry(name: string, path: string) {
    this.matIconRegistry.addSvgIcon(name, this.domSanitizer.bypassSecurityTrustResourceUrl(path))
  }
}
