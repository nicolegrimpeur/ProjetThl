import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Display} from '../shared/class/display';
import {HttpService} from '../core/http.service';
import {lastValueFrom} from 'rxjs';
import {User} from '../shared/class/user';
import {UserRoles} from '../shared/model/infosUserModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // data utilisés pour la connexion
  public registerData = {
    name: '',
    surname: '',
    mail: '',
    psw: '',
    confirmPassword: '',
    category: -1,
    medId: '',
    birthday: ''
  };
  public isADoctor = false;
  public date = '';

  constructor(public router: Router, public display: Display, private httpService: HttpService, private user: User) {
  }

  ngOnInit() {
  }

  // permet d'afficher le mot de passe
  toggleMdp(iconMdp, inputMdp) {
    if (iconMdp.name === 'eye-outline') {
      iconMdp.name = 'eye-off-outline';
      inputMdp.type = 'password';
    } else {
      iconMdp.name = 'eye-outline';
      inputMdp.type = 'text';
    }
  }

  myFormatDate() {
    const tmp = new Date(this.registerData.birthday);
    this.date = new Intl.DateTimeFormat('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'}).format(tmp);
  }

  checkCivilite() {
    if (this.registerData.name === '' || this.registerData.surname === '') {
      this.display.display({
        code: 'Vous devez rentrer un nom ou prénom valide !',
        color: 'danger'
      });
    } else {
      this.checkDate();
    }
  }


  checkPwd() {
    const validatePwd = (pwd) => String(pwd)
      .match(
        // eslint-disable-next-line max-len
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      );
    if (validatePwd(this.registerData.psw)) {
      if (this.registerData.psw !== this.registerData.confirmPassword) {
        this.registerData.psw = '';
        this.registerData.confirmPassword = '';
        //Display error message
        this.display.display('Attention les mots de passe sont différents !');
        return;
      } else {
        this.checkRadio();
      }
    } else if (!validatePwd(this.registerData.psw)) {
      this.display.display('Le mot de passe doit contenir au moins 1 lettre majuscule, 1 chiffre, 1 caractère spécial').then();
    }

    //
  }

  checkMail() {
    const validateEmail = (email) => String(email)
      .toLowerCase()
      .match(
        // eslint-disable-next-line max-len
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (validateEmail(this.registerData.mail)) {
      this.checkPwd();
    } else {
    }
  }

  checkDate() {
    // si la date est dans le futur, erreur
    if (new Date(this.registerData.birthday) > new Date()) {
      this.display.display('Merci de rentrer votre vraie date de naissance, cette date est dans le futur !').then();
    } else {
      this.checkMail();
    }
  }

  checkRadio() {
    if (!this.isADoctor) {
      this.registerData.category = UserRoles.USER;
      this.makeRegister();

    } else if (this.isADoctor) {
      //  this.checkMedicalId();
      this.registerData.category = UserRoles.HEALTHCARE;
    }
  }

  // checkMedicalId() {
  //   //Verification si l'inscrit est bien dans la base des médecins diplomés
  //   lastValueFrom(this.httpService.checkMedic(
  //     Number(this.registerData.medId),
  //     this.registerData.name,
  //     this.registerData.surname
  //   ))
  //     .then(res => {
  //         this.makeRegister();
  //     })
  //     .catch(err => {
  //       this.display.display(err.error.message).then();
  //     });
  // }

  makeRegister() {
    //Enregistrer les infos(Back)
    lastValueFrom(this.httpService.createUser({
      name: this.registerData.name,
      surname: this.registerData.surname,
      password: this.registerData.psw,
      birthdate: this.registerData.birthday,
      email: this.registerData.mail,
      category: this.registerData.category,
    }))
      .then(async ({user, token}) => {
        await Promise.all([this.user.setUser(user), this.user.setToken(token)]);
        this.router.navigateByUrl('home').then();
        this.display.display({
          code: 'Inscription réussie !',
          color: 'success'
        }).then();
      })
      .catch(err => {
        this.router.navigateByUrl('register').then(r => this.display.display({
          code: err.error?.text ?? 'Failed',
          color: 'danger'
        }));
      });
    //Redirection
  }
}
