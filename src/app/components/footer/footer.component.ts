import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
  }

}
