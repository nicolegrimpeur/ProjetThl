import {Component, OnInit} from '@angular/core';
import {Display} from '../shared/class/display';
import {Router} from '@angular/router';
import {lastValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RegisterData} from '../shared/model/registerDataUserModel';
import {User} from '../shared/class/user'
import {HttpService} from '../core/http.service';

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
  public passwordData = '';
  public passwordUser = '';

  constructor(private display: Display, public router: Router, private user: User, private httpService: HttpService) {
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

/*
  checkPwd() {

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
  }*/
  confirmPswdChange() {
    //Vérifier que oldpassword est bon (back)
    const idUser = this.user.userData;
    const validatePwd = (pwd) => String(pwd)
      .match(
        // eslint-disable-next-line max-len
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      );
    if(validatePwd(this.newPassword)) {
      if (this.newPassword === this.confirmNewPassword) {
        lastValueFrom(this.httpService.modifPsw(idUser.token, this.oldPassword, this.newPassword))
          .then(res => {
            console.log('res: ', res);
            this.router.navigateByUrl('home').then(r => this.display.display({
              code: 'Modification de mot de passe réussie !',
              color: 'success'
            }));
          })
          .catch(err => {
            console.log('err : ', err);
          });
      } else {
        //Si ils ne correspondent pas
        this.display.display({
          code: 'Les mots de passe ne correspondent pas',
          color: 'danger'
        });
      }
    }
    else if (!validatePwd(this.newPassword)) {
      this.display.display('Le mot de passe doit contenir au moins 1 lettre majuscule, 1 chiffre et contenir au moins 8 caractère');
    }
    /*
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
    this.password = '';*/
  }


  confirmAccSuppr() {
    this.display.alertWithInputs('Confirmer la suppression de votre compte', [])
      .then(() => {
        const idUser = this.user.userData; //un objet  idUser.token
        const pswUser = this.passwordUser;
        //Supprimer le compte (back) & se déconnecter
        lastValueFrom(this.httpService.deleteUser(idUser.token, pswUser))
          .then(res => {
            console.log('res : ', res);
            this.router.navigateByUrl('identification').then(r => this.display.display({
              code: 'Suppression réussie !',
              color: 'success'
            }));
          })
          .catch(err => {
            console.log('err : ', err);
            this.display.display({
              code: 'Suppression échoué !',
              color: 'success'
            }).then();
          });
      });
  }

  supprData() {
    this.display.alertWithInputs('Confirmer la suppression de vos données de tests', [])
      .then(res => {
        if (res.role === 'backdrop' || res.role === 'cancel') {
          this.display.display('Suppression annulé').then();
        } else {
          lastValueFrom(this.httpService.deleteData(this.user.userData.token, this.passwordData))
            .then(result => {
              this.display.display({code: 'Suppression réussi', color: 'success'}).then();
            })
            .catch(error => {
              this.display.display(error.message).then();
            });
        }
      });
  }
}
