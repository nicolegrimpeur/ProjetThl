import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Display} from '../shared/class/display';
import {lastValueFrom} from 'rxjs';
import {HttpService} from '../core/http.service';
import {User} from '../shared/class/user';
import {InfosUserModel} from "../shared/model/infosUserModel";

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

  // permet d'afficher le mot de passe
  toggleMdp(iconMdp, inputMdp) {
    if (iconMdp.name === 'eye-outline') {
      iconMdp.name = 'eye-off-outline';
      inputMdp.type = 'password';
    }
    else {
      iconMdp.name = 'eye-outline';
      inputMdp.type = 'text';
    }
  }

  // connecte l'utilisateur avec email et mot de passe
  makeConnection() {
    lastValueFrom(this.httpService.login(this.loginData.email, this.loginData.password))
      .then(res => {
       /* const {user} = res;
        user.jwtToken = res.token;*/
        this.user.setUser(res);
        this.router.navigateByUrl('home').then();
        this.display.display({code: 'Connexion réussie !', color: 'success'}).then();
      })
      .catch(err => {
        this.display.display(err.error.message).then();
      });
  }
}
