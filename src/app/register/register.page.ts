import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Display} from '../shared/class/display';


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
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(public router: Router, public display: Display) {
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

  checkPwd(){
    if (this.registerData.password !== this.registerData.confirmPassword){
      this.registerData.password = '';
      this.registerData.confirmPassword = '';
      //Display error message
      this.display.display("Attention les mots de passe sont différents !");
      return;
    }
    //If password is good
    this.makeRegister();
    this.display.display({code:"Inscription réussie !", color: "success"});
  }

  makeRegister(){
    this.router.navigateByUrl('home').then();
  }
}
