import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Display} from '../shared/class/display';
import {lastValueFrom} from 'rxjs';
import {HttpService} from '../core/http.service';
import {User} from '../shared/class/user';

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
    public router: Router,
    public display: Display,
    private httpService: HttpService,
    private user: User
  ) {
  }

  ngOnInit() {
  }

  // connecte l'utilisateur avec email et mot de passe
  makeConnection() {
    lastValueFrom(this.httpService.login(this.loginData.email, this.loginData.password)).then(res => {
      this.user.setUser(res);
      this.router.navigateByUrl('home').then();
      this.display.display({code: 'Connexion réussie !', color: 'success'}).then();
    })
      .catch(res => {
        if (res.status === 202) {
          this.display.display('Ce mail n\'existe pas encore, merci de vous créer un compte').then();
        } else if (res.status === 201) {
          this.display.display('Mot de passe invalide').then();
        } else {
          this.display.display('Une erreur a eu lieu').then();
        }
      });
  }
}
