import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MenuController, Platform} from '@ionic/angular';
import {Display} from './shared/class/display';
import {User} from './shared/class/user';
import {StorageService} from './core/storage/storage.service';
import {App} from "@capacitor/app";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private menu: MenuController,
    private display: Display,
    public router: Router,
    public user: User,
    private storageService: StorageService,
    private platform: Platform,
    private route: Router
  ) {
  }


  disconnectUser() {
    //Déconnecter l'utilisateur (Back)
    // Supprime les données utilisateurs en cache
    this.storageService.setUserData({}).then();
    this.storageService.setToken('').then();
    //Redirection
    this.router.navigateByUrl('identification').then();
    //Graphiques
    this.display.display({code: 'Déconnexion réussie', color: 'success'}).then();
    this.menu.close().then();
  }
}
