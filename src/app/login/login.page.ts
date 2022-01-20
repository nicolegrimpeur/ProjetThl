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
    lastValueFrom(this.httpService.login(this.loginData.email, this.loginData.password))
      .then(res => {
        if (res.status === 200) {
          this.user.setUser(res.message);
          this.router.navigateByUrl('home').then();
          this.display.display({code: 'Connexion réussie !', color: 'success'}).then();
        } else {
          this.display.display(res.message).then();
        }
      })
      .catch(err => {
        this.display.display(err.error.text).then();
      });
  }
}
