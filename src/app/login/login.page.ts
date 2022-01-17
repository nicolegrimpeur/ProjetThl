import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Display } from '../shared/class/display';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // data utilisés pour la connexion
  public loginData = {
    email: '',
    password: ''
  };

  constructor(
    public router: Router, public display: Display
  ) {
    let after = false;
    // récupère l'email dans le lien
    for (const i of this.router.url) {
      if (after && i !== '=') {
        this.loginData.email += i;
      } else if (i === '?') {
        after = true;
      }
    }
  }

  ngOnInit() {
  }

  // connecte l'utilisateur avec email et mot de passe
  makeConnection() {
    this.router.navigateByUrl('identification').then();
    this.display.display({code:"Connexion réussie !", color:"success"});
  }
}
