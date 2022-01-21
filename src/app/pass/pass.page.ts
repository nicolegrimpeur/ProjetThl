import {Component, OnInit} from '@angular/core';
import {User} from '../shared/class/user';
import {lastValueFrom} from 'rxjs';
import {HttpService} from '../core/http.service';
import {ICertificate} from '../shared/model/certificates';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.page.html',
  styleUrls: ['./pass.page.scss'],
})
export class PassPage implements OnInit {
  private passToken:string;
 private certificates: Array<ICertificate>;
  constructor(public user: User, private httpService: HttpService) {
  }

  async ngOnInit() {
    this.certificates= await this.fetchCerticates();
    this.passToken= await this.user.getPassToken();
  }

  generateQrCodeData(): string {
    const userData = this.user.getUserData();

    return JSON.stringify({
      // eslint-disable-next-line no-underscore-dangle
      _id: userData._id,
      name: userData.name,
      token: userData.qrToken,
      surname: userData.surname,
      certificates:this.certificates,
      passToken:this.passToken,
    });
  }
  fetchCerticates() {
    return lastValueFrom(this.httpService.getCertificates()).then(res => res.certificates);
  }
  // événement pour rafraichir la page
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.user.refreshUser();
    }, 1000);
  }
}
