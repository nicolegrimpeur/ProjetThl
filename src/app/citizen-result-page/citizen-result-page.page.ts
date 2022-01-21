import {Component, OnInit} from '@angular/core';
import {User} from '../shared/class/user';
import {lastValueFrom} from 'rxjs';
import {HttpService} from '../core/http.service';
import {CertificateType, ICertificate} from '../shared/model/certificates';
import {Display} from '../shared/class/display';

@Component({
  selector: 'app-citizen-result-page',
  templateUrl: './citizen-result-page.page.html',
  styleUrls: ['./citizen-result-page.page.scss'],
})

export class CitizenResultPagePage implements OnInit {
  public userCertificates: Array<ICertificate>;
  public userVaccinCertificates: Array<ICertificate>;
  public userTestCertificates: Array<ICertificate>;
  private date: string;

  constructor(private httpService: HttpService,
              private user: User, private display: Display
  ) {
  }

  async ngOnInit() {
    this.userCertificates = await this.fetchCerticates();
    this.userVaccinCertificates = this.userCertificates.filter(certificate => certificate.type === CertificateType.VACCINE);
    this.userTestCertificates = this.userCertificates.filter(certificate => certificate.type === CertificateType.TEST);
    console.log(this.userTestCertificates);

  }

  inputNgFor(index, item) {
    return index;
  }

  fetchCerticates() {
    return lastValueFrom(this.httpService.getCertificates()).then(res => res.certificates);
  }

  // pour supprimer les tests
  supprData(certificateId: string) {
    this.display.alertWithInputs('Confirmer la suppression de vos données de tests', [])
      .then(res => {
        if (res.role === 'backdrop' || res.role === 'cancel') {
          this.display.display('Suppression annulé').then();
        } else {
          lastValueFrom(this.httpService.deleteData(certificateId))
            .then(result => {
              this.fetchCerticates().then(() => this.display.display({code: 'Suppression réussi', color: 'success'}));
            })
            .catch(error => {
              this.display.display(error.error.message).then();
            });
        }
      });
  }
  myFormatDate(dateForm) {
    const tmp = new Date(dateForm);
    return new Intl.DateTimeFormat('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'}).format(tmp);
  }
  // événement pour rafraichir la page
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.user.refreshUser();
    }, 1000);
  }

  genCertificatesPdf(certificateId: string) {
    lastValueFrom(this.httpService.genPdf(certificateId))
      .then(result => {
        const blob = new Blob([result], {type: 'application/pdf'});
        const objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl);
      })
      .catch(error => {
        this.display.display(error.error.message).then();
      });
  }
}
