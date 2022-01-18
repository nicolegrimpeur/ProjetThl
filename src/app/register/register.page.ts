import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Display} from '../shared/class/display';
import {HttpService} from '../core/http.service';
import {lastValueFrom} from 'rxjs';


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
    email: 'pldu78@gmail.com',
    password: 'A1azerty',
    confirmPassword: 'A1azerty',
    medId: '',
    dateOfBirth: ''
  };
  public isADoctor = false;
  public date = '';

  constructor(public router: Router, public display: Display, private httpService: HttpService) {
    let after = false;
    // récupère l'email dans le lien
    for (const i of this.router.url) {
      if (after && i !== '=') {
        this.registerData.email += i;
      } else if (i === '?') {
        after = true;
      }
    }
  }

  ngOnInit() {
  }

  myFormatDate() {
    const datePlusTime = this.registerData.dateOfBirth;
    const date = datePlusTime.slice(0, 10);
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    this.date = day + ' / ' + month + ' / ' + year;
  }

  checkPwd() {
    const validatePwd = (pwd) => String(pwd)
      .match(
        // eslint-disable-next-line max-len
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      );
    if (validatePwd(this.registerData.password)) {
      console.log('OK');
      if (this.registerData.password !== this.registerData.confirmPassword) {
        this.registerData.password = '';
        this.registerData.confirmPassword = '';
        //Display error message
        this.display.display('Attention les mots de passe sont différents !');
        return;
      }
      else{
        this.checkDate();
      }
    } else if(!validatePwd(this.registerData.password)) {
      this.display.display('Le mot de passe doit contenir au moins 1 lettre majuscule, 1 chiffre, 1 caractère spécial');
    }

   // this.display.display({code: 'Inscription réussie !', color: 'success'});
  }

  checkMail() {
    const validateEmail = (email) => String(email)
      .toLowerCase()
      .match(
        // eslint-disable-next-line max-len
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (validateEmail(this.registerData.email)) {
      console.log('OK');
    } else {
      console.log('wrong email format');
    }
  }
//^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
  checkDate() {
    const currentDate = new Date();
    const birthDate = this.date.split('/');
    console.log(birthDate);
    // eslint-disable-next-line max-len
    if (currentDate.getDate() < parseInt(birthDate[0], 10) && currentDate.getMonth() <= parseInt(birthDate[1], 10) && currentDate.getFullYear() <= parseInt(birthDate[2], 10)) {
      this.display.display('Vous êtes un petit malin :) mais veuillez rentrer une date conforme');
      console.log(birthDate);
    }
    else  if (currentDate.getMonth() < parseInt(birthDate[1], 10) && currentDate.getFullYear() < parseInt(birthDate[2], 10)) {
      this.display.display('Vous êtes un petit malin :) mais veuillez rentrer une date conforme');
      console.log(birthDate);
    }
    else if (currentDate.getFullYear() < parseInt(birthDate[2], 10)) {
      this.display.display('Vous êtes un petit malin :) mais veuillez rentrer une date conforme');
      console.log(birthDate);
    }
    else if(this.date ===''){
      this.display.display('vous avez oublié de rentrer la date');
    }
    else{
      this.checkMail();
    }
  }

  makeRegister() {
    //Enregistrer les infos(Back)
    lastValueFrom(this.httpService.createUser(this.registerData))
      .then(res => {
        console.log('res : ', res);
      })
      .catch(err => {
        console.log('err : ', err);
      });
    //Redirection
    this.router.navigateByUrl('home').then();
  }
}
