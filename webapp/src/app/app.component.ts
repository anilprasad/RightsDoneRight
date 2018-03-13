import { Component } from '@angular/core';

@Component({
  // set the source of the base address for module-relative URLs such as the templateUrl
  // the HTML tag that the template will be inserted into
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Blockchain for copyrights';
}