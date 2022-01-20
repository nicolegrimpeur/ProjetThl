import { Component, OnInit } from '@angular/core';
import {User} from '../shared/class/user';

@Component({
  selector: 'app-citizen-rdv-page',
  templateUrl: './citizen-rdv-page.page.html',
  styleUrls: ['./citizen-rdv-page.page.scss'],
})
export class CitizenRdvPagePage implements OnInit {

  constructor(
    private user: User
  ) { }

  ngOnInit() {
  }

  // événement pour rafraichir la page
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.user.getUser().then();
    }, 1000);
  }
}
