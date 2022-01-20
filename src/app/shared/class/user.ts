import {Injectable} from '@angular/core';
import {InfosUserModel} from '../model/infosUserModel';
import {lastValueFrom} from 'rxjs';
import {HttpService} from '../../core/http.service';
import {Router} from '@angular/router';
import {StorageService} from '../../core/storage/storage.service';
import {TestModel} from '../model/testModel';
import {VaccineModel} from '../model/vaccineModel';
import {Network} from '@capacitor/network';
import {Display} from "./display";

@Injectable({
  providedIn: 'root'
})
export class User {
  public userData: InfosUserModel = new class implements InfosUserModel {
    birthday: string;
    category: number;
    mail: string;
    medical_id: string;
    name: string;
    surname: string;
    tests_result: TestModel;
    token: string;
    uuid: string;
    vaccine: VaccineModel;
  }();

  constructor(
    private httpService: HttpService,
    private router: Router,
    private storageService: StorageService,
    private display: Display
  ) {
    this.getUser().then();
  }

  async getUser() {
    await this.storageService.getUserData().then(value => {
      if (value !== null) {
        this.userData = value;
      }
    });

    const status = await Network.getStatus();
    if (this.userData.token !== undefined) {
      if (status.connected) {
        lastValueFrom(this.httpService.getUser(this.userData.token))
          .then(res => {
            if (res.status !== 200) {
              this.display.display(res.message).then();
            } else {
              this.userData = res.message;
              this.storageService.setUserData(res.message).then();
            }
          })
          .catch(err => {
            this.display.display(err.error.text).then();
          });
      }
    } else {
      this.router.navigateByUrl('/identification').then();
    }
  }

  setUser(userData) {
    this.userData = userData;
    this.storageService.setUserData(userData).then();
  }

  checkMdp() {

  }
}
