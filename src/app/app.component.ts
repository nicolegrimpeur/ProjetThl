import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {Display} from './shared/class/display';
import {User} from './shared/class/user';

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
    public user: User
  ) {
  }

  disconnectUser() {
    //Déconnecter l'utilisateur (Back)

    //Redirection
    this.router.navigateByUrl('identification').then();
    //Graphiques
    this.display.display({code: 'Déconnexion réussie', color: 'success'}).then();
    this.menu.close().then();
  }
}
