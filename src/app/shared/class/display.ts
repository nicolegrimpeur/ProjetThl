import {ActionSheetController, AlertController, ToastController} from '@ionic/angular';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Display {
  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) {
  }

  // affiche d'un toast contenant le texte de l'erreur
  // message peut être égal à
  // 'info'
  // ou {code: 'info', color: 'color'}
  async display(message: any) {
    let strMessage = message;
    let couleur = 'danger';

    // si l'on donne une couleur dans l'erreur
    if (message.color !== undefined) {
      strMessage = message.code;
      couleur = message.color;
    }

    // création du toast
    const toast = await this.toastController.create({
      message: strMessage,
      duration: 3000,
      position: 'top',
      color: couleur
    });
    // affichage du toast
    await toast.present();
  }

  // création d'une alerte
  async alert(headerStr: string, info: string) {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: headerStr,
      message: info,
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertWithInputs(headerStr: string, inputsTab) {
    const alert = await this.alertController.create({
      header: headerStr,
      inputs: inputsTab,
      buttons: [{
        text: 'Annuler',
        role: 'cancel'
      }, {
        text: 'Ok',
        role: 'ok'
      }]
    });

    // on affiche l'alerte
    await alert.present();

    // on attend que l'utilisateur supprime l'alerte
    return await alert.onDidDismiss().then(result => result);
  }

  // template d'action sheet avec
  // infos le tableau d'infos, title le titre, header l'header
  async actionSheet(infos: Array<any>, headerStr: string) {
    const tmp = [];

    // on parcours la liste de plannings et on rajoute un bouton pour chaque
    for (let i = 0; i < infos.length; i++) {
        tmp.push({
          text: infos[i],
          role: i,
        });
    }

    // on rajoute le bouton annuler
    tmp.push({
      text: 'Annuler',
      role: 'cancel'
    });

    // création de l'action sheet
    const actionSheet = await this.actionSheetController.create({
      header: headerStr,
      cssClass: 'actionSheet',
      buttons: tmp
    });
    // on affiche l'action sheet
    await actionSheet.present();

    // lorsqu'une sélection est faite, on récupère son attribut
    return await actionSheet.onDidDismiss().then(result => result.role);
  }
}
