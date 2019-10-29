import { Component } from '@angular/core';
import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IMPEL IT';
  constructor(
    private auth: AuthenticationService
  ){

  }
}
