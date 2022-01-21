import {Component, ViewChild} from '@angular/core';
import {Display} from '../shared/class/display';
import {HttpService} from '../core/http.service';
import {lastValueFrom} from 'rxjs';
import {HttpChiffreService} from '../core/httpChiffre.service';
import {StatModel} from '../shared/model/statModel';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import {App} from '@capacitor/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('ionCardContent') ionCard; // permet de modifier l'élément html (pour modifier css, texte ou autre)
  public stat: Partial<StatModel> = {};
  public date: string;

  constructor(
    public display: Display,
    public httchiffreservice: HttpChiffreService,
    public httpService: HttpService,
    private platform: Platform,
    private route: Router
  ) {
    // gestion de la touche mobile back
    this.platform.backButton.subscribeWithPriority(-1, () => {
      // si l'on est sur la page principale on quitte l'application
      if (this.route.url === '/home' || this.route.url === '/identification') {
        App.exitApp();
      } else if (this.route.url === '/login' || this.route.url === '/register') {
        this.route.navigate(['/identification']).then();
      } else if (
        this.route.url === '/pass' ||
        this.route.url === '/account' ||
        this.route.url === '/citizen-tab/citizen-rdv-page' ||
        this.route.url === '/citizen-tab/citizen-result-page' ||
        this.route.url === '/citizen-tab/citizen-declaration-page' ||
        this.route.url === '/doctor-tab/doctor-fill' ||
        this.route.url === '/doctor-tab/doctor-rdv') {
        this.route.navigate(['/home']).then();
      }
    });
  }

  ionViewWillEnter() {
    lastValueFrom(this.httchiffreservice.run())
      .then(res => {
        this.stat = res[0];
        this.date = new Intl.DateTimeFormat('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }).format(new Date(this.stat.date));
      })
      .catch(err => {
        console.log('err : ', err);
      });
  }
}
