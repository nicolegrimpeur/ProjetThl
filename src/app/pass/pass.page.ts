import { Component, OnInit } from '@angular/core';
import {User} from '../shared/class/user';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.page.html',
  styleUrls: ['./pass.page.scss'],
})
export class PassPage implements OnInit {

  constructor(public user: User) { }

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
