import {Component, ViewChild} from '@angular/core';
import {Display} from '../shared/class/display';
import {HttpService} from '../core/http.service';
import {lastValueFrom} from 'rxjs';

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

  constructor(
    public display: Display,
    public httpService: HttpService
  ) {
  }

  ionViewWillEnter() {
    lastValueFrom(this.httpService.getUser('123456789'))
      .then(res => {
        console.log('res : ', res);
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
}
