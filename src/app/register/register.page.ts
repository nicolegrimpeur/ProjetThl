import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Display} from '../shared/class/display';
import {HttpService} from '../core/http.service';
import {lastValueFrom} from 'rxjs';
import {User} from '../shared/class/user';
import {UserRoles} from "../shared/model/infosUserModel";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // data utilisés pour la connexion
  public registerData = {
    name: 'p',
    surname: 'd',
    mail: 'pldu78@gmail.com',
    psw: 'A1azerty',
    confirmPassword: 'A1azerty',
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
      this.display.display('Le mot de passe doit contenir au moins 1 lettre majuscule, 1 chiffre, 1 caractère spécial');
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
    const currentDate = new Date();
    const birthDate = this.date.split('/');
    // eslint-disable-next-line max-len
    if (currentDate.getDate() < parseInt(birthDate[0], 10) && currentDate.getMonth() <= parseInt(birthDate[1], 10) && currentDate.getFullYear() <= parseInt(birthDate[2], 10)) {
      this.display.display('Vous êtes un petit malin :) mais veuillez rentrer une date conforme');
    } else if (currentDate.getMonth() < parseInt(birthDate[1], 10) && currentDate.getFullYear() < parseInt(birthDate[2], 10)) {
      this.display.display('Vous êtes un petit malin :) mais veuillez rentrer une date conforme');
    } else if (currentDate.getFullYear() < parseInt(birthDate[2], 10)) {
      this.display.display('Vous êtes un petit malin :) mais veuillez rentrer une date conforme');
    } else if (this.date === '') {
      this.display.display('vous avez oublié de rentrer la date');
    } else {
      this.checkMail();
    }
  }

  checkRadio() {
    if (document.querySelector<HTMLIonRadioElement>('#radioBoxCitoyen').ariaChecked.toString() === 'true') {
      this.registerData.category = UserRoles.USER;
      this.makeRegister();

    } else if (document.querySelector<HTMLIonRadioElement>('#radioBoxMedic').ariaChecked.toString() === 'true') {
      this.registerData.category = UserRoles.HEALTHCARE;
      console.log(this.registerData.medId);
      if(this.registerData.category===-1){
        this.registerData.category = 1;
      }
      this.makeRegister();
    }
  }

  /*
    checkMedicalId() {
      //Verification si l'inscrit est bien dans la base des médecins diplomés
      lastValueFrom(this.httpService.checkMedic(
        Number(this.registerData.medId),
        this.registerData.name,
        this.registerData.surname
      ))
        .then(res => {
          if (res.status === 200) {
            this.makeRegister();
          } else {
            this.display.display(res.message).then();
          }
        })
        .catch(err => {
          this.display.display(err.error.text).then();
        });
    }
  */
  makeRegister() {
    //Enregistrer les infos(Back)
    lastValueFrom(this.httpService.createUser({
      name: this.registerData.name,
      surname: this.registerData.surname,
      password: this.registerData.psw,
      birthdate: this.registerData.birthday,
      email: this.registerData.mail,
      category: this.registerData.category,
      medId: this.registerData.medId
    }))
      .then(async ({user, token}) => {
        await Promise.all([this.user.setUser(user), this.user.setToken(token)]);
        this.router.navigateByUrl('home');
        this.display.display({
          code: 'Inscription réussie !',
          color: 'success'
        });

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
