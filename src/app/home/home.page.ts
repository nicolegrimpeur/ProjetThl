import {Component, ViewChild} from '@angular/core';
import {Display} from '../shared/class/display';
import {HttpService} from '../core/http.service';
import {lastValueFrom} from "rxjs";
import {InfosUserModel} from "../shared/model/infosUserModel";
import { HttpChiffreService } from '../core/httpChiffre.service';
import {StatModel} from '../shared/model/statModel';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('ionCardContent') ionCard; // permet de modifier l'élément html (pour modifier css, texte ou autre)
  public result: string; // initialisé à undefined, puis utiliser pour afficher le résultat de l'actionSheet
  public date = '';

  public vaccineData = {
    mail: 'watteltheo@gmail.com',
    lab: 'Moderna',
    date: '2022-01-05T08:21:00.000+00:00'
  };

  public stat: StatModel=new class implements StatModel {
    date: string;
    dc_tot: string;
    dchosp: string;
    esms_cas: string;
    esms_dc: string;
    hosp: string;
    incid_dchosp: string;
    incid_hosp: string;
    incid_rad: string;
    incid_rea: string;
    rad: string;
    rea: string;
  }();

  constructor(
    public display: Display,
    public httchiffreservice: HttpChiffreService,
    public httpService: HttpService
  ) {
  }

  ionViewWillEnter() {
    lastValueFrom(this.httchiffreservice.run())
      .then(res => {
        this.stat = res[0];
      })
      .catch(err => {
        console.log('err : ', err);
      });
  }

  clickActionSheet() {
    this.display.actionSheet([
      'Bonjour',
      'voici',
      'un',
      'actionSheet'
    ], 'ActionSheet').then(res => {
      console.log(res);
      if (res !== 'cancel' && res !== 'backdrop') {
        this.ionCard.el.textContent = 'Résultat avec ViewChild : ' + res;
        this.result = 'avec {{}} : ' + res;
      } else {
        this.ionCard.el.textContent = 'Résultat avec ViewChild : ' + res;
        this.result = undefined;
      }
    });
  }

  myFormatDate(){
    const tmp = new Date(this.vaccineData.date);
    this.date = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric'}).format(tmp);
  }
  uploadVaccineData() {
    console.log('Infos recues : [' + this.vaccineData.mail + ' ; ' + this.vaccineData.lab + ' ; ' + this.vaccineData.date + ']');
    lastValueFrom(this.httpService.addVaccine({
      mail: this.vaccineData.mail,
      lab: this.vaccineData.lab,
      date: this.vaccineData.date
    }))
      .then(res => {
        console.log('res:',res);
      })
      .catch(err => {
        console.log('err:',err);
      });
  }

  /*uploadVaccineData() {
    console.log('Infos recues : [' + this.vaccineData.mail + ' ; ' + this.vaccineData.lab + ' ; ' + this.vaccineData.date + ']');
    lastValueFrom(this.httpService.addVaccine({
      mail: this.vaccineData.mail,
      lab: this.vaccineData.lab,
      date: this.vaccineData.date
    }))
      .then(res => {
        console.log('res:',res);
      })
      .catch(err => {
        console.log('err:',err);
      });
  }*/
}


