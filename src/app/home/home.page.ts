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


  public stat = new StatModel;

  constructor(
    public display: Display,
    public httchiffreservice: HttpChiffreService
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
}
