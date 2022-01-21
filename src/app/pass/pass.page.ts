import {Component, OnInit} from '@angular/core';
import {User} from '../shared/class/user';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.page.html',
  styleUrls: ['./pass.page.scss'],
})
export class PassPage implements OnInit {

  constructor(public user: User) {
  }

  ngOnInit() {
  }

  generateQrCodeData(): string {
    const userData = this.user.getUserData();

    return JSON.stringify({
      // eslint-disable-next-line no-underscore-dangle
      _id: userData._id,
      name: userData.name,
      surname: userData.surname,
      email: userData.email
    });
  }

  // événement pour rafraichir la page
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.user.refreshUser();
    }, 1000);
  }
}
