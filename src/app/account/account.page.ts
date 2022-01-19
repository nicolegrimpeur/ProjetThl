import { Component, OnInit } from '@angular/core';
import { Display } from '../shared/class/display';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {RegisterData} from '../shared/model/registerDataUserModel';
import {User} from '../shared/class/user'

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  //Variables changement de mdp
  public oldPassword: string;
  public newPassword: string;
  public confirmNewPassword: string;
  //Variable pour suppression de compte
  public password: string;

  constructor(private display: Display, public router: Router) {
    this.password = '';
  }

  ngOnInit() {
  }

  confirmPswdChange() {
    //Vérifier que oldpassword est bon (back)
    if (this.oldPassword === "123") {
      //Vérif les deux mdps correspondent
      if (this.newPassword === this.confirmNewPassword) {
        //Changer le mdp (back)

        //Graphiques
        this.display.display({ code: "Votre mot de passe a bien été changé !", color: "success" });
      }
      else {
        //Si ils ne correspondent pas
        this.display.display({ code: "Les mots de passe ne correspondent pas", color: "danger" });
      }
    }
    else{
      this.display.display({code: "Erreur ! Votre mot de passe n'est pas bon", color:"danger"});
    }
    //Reset value
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
    this.password = '';
  }

/*
   confirmAccSuppr() {
     //Vérifier que le mdp est bon
     const idUser = getUser(); //un objet  idUser.token
     const pswUser = this.AccountPage.password;
     //Supprimer le compte (back) & se déconnecter
     if(idUser.psw===pswUser){
        lastValueFrom(this.httpService.deleteUser(idUser.token)
        .then(res => {
        console.log('res : ', res);
        })
          .catch(err => {
          console.log('err : ', err);
        });
      }
      else{
        console.log("mot de passe différent");
      }
       //Graphiques
       this.display.display({code:"Votre compte a bien été supprimé", color:"success"});
       //Redirection
       this.router.navigateByUrl('identification').then();
     }
     else{
       //Graphiques
       this.display.display("Votre mot de passe ne correspond pas");
     }
     //Reset value
    this.oldPassword = '';
     this.newPassword = '';
     this.confirmNewPassword = '';
     this.password = '';
   }*/
}
