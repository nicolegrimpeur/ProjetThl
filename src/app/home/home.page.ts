import {Component, OnInit, ViewChild} from '@angular/core';
import {Display} from '../shared/class/display';
import {HttpService} from '../core/http.service';
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('ionCardContent') ionCard; // permet de modifier l'élément html (pour modifier css, texte ou autre)
  public result: string; // initialisé à undefined, puis utiliser pour afficher le résultat de l'actionSheet

  // test ngFor
  public tab = [
    {infos: 'bonjour'},
    {infos: 'ca'},
    {infos: 'c\'est'},
    {infos: 'ngFor'},
  ];

  public vaccineData = {
    mail: 'watteltheo@gmail.com',
    lab: 'Moderna',
    date: '2022-01-05T08:21:00.000+00:00',
  };

  constructor(
    public display: Display,
    public httpService: HttpService
  ) {
  }

  ionViewWillEnter() {

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
}
