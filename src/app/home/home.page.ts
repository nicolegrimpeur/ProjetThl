import {Component, ViewChild} from '@angular/core';
import {Display} from '../shared/class/display';
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";

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
    public display: Display
  ) {
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
