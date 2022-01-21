import {Component, OnInit} from '@angular/core';
import {Display} from '../shared/class/display';
import {Router} from '@angular/router';
import {lastValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RegisterData} from '../shared/model/registerDataUserModel';
import {User} from '../shared/class/user';
import {HttpService} from '../core/http.service';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {InfosUserModel} from '../shared/model/infosUserModel';

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
  public imageExist: boolean; // true si une image a déjà été initialisé pour cet utilisateur
  public urlImage = './assets/avatar.svg';

  constructor(private display: Display, public router: Router, public user: User, private httpService: HttpService) {
  }

  ngOnInit() {
  }

  ionViewDidLeave() {
    window.URL.revokeObjectURL(this.urlImage);

    this.urlImage = './assets/avatar.svg';
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
        lastValueFrom(this.httpService.updatePassword(this.oldPassword, this.newPassword))
          .then(res => {
            this.router.navigateByUrl('home').then(r => this.display.display({
              code: 'Modification de mot de passe réussie !',
              color: 'success'
            }));
          })
          .catch(err => {
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
      this.display.display('Le mot de passe doit contenir au moins 1 lettre majuscule, 1 chiffre et contenir au moins 8 caractère').then();
    }
  }


  confirmAccSuppr() {
    this.display.alertWithInputs('Confirmer la suppression de votre compte', [])
      .then(() => {
        const idUser = this.user.userData; //un objet  idUser.token
        const pswUser = this.passwordUser;
        //Supprimer le compte (back) & se déconnecter
        lastValueFrom(this.httpService.deleteUser())
          .then(res => {
            this.router.navigateByUrl('identification').then(r => this.display.display({
              code: 'Suppression réussie !',
              color: 'success'
            }));
          })
          .catch(err => {
            this.display.display({
              code: 'Suppression échoué !',
              color: 'success'
            }).then();
          });
      });
  }

  async accessGallery() {
    let image;
    let blobData;

    const options = {
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      sourceType: CameraSource.Photos
    };

    await Camera.getPhoto(options)
      .then(result => {
        image = result;
        console.log(image.format);
        blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
      })
      .catch((err) => {
        this.display.display('Une erreur a eu lieu : ' + err).then();
      });

    if (image.format !== 'jpeg') {
      this.display.display('L\'image doit être au format jpg').then();
    } else {
     /* lastValueFrom(this.httpService.uploadImg(blobData, this.user.userData.jwtToken, image.format))
        .then(result => {
          this.display.display({
            code: 'L\'image a bien été ajouté',
            color: 'success'
          }).then();
          // this.labelImage.el.textContent =
          //   this.langue === 'fr' ? 'L\'image a bien été mise en ligne' : 'The image has been uploaded';
          //
          // this.imageExist = true;
        })
        .catch(err => {
          this.display.display('Une erreur a eu lieu' + err).then();
          // this.labelImage.el.textContent =
          //   this.langue === 'fr' ? 'Une erreur a eu lieu, merci de réessayer' : 'An error has occurred, please try again';
        });*/
    }
  }

  // permet de convertir l'image en blob
  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
  }

  // permet de télécharger l'image de la résidence
  /*downloadImg() {
    lastValueFrom(this.httpService.downloadImg(this.user.userData.jwtToken))
      .then(res => {
        // ouvre une nouvelle page en affichant l'image
        if (this.imageExist !== undefined) {
          this.urlImage = window.URL.createObjectURL(res);
        }

        this.imageExist = true;
      })
      .catch(err => {
        if (err.status === 500) {
          if (this.imageExist !== undefined) {
            this.display.display('L\'image n\'a pas été trouvé').then();
          }
          this.imageExist = false;
        } else {
          this.display.display('Une erreur a eu lieu, merci de réessayer plus tard').then();
        }
      });
  }*/

  // événement pour rafraichir la page
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.user.refreshUser();
    }, 1000);
  }
}
