import {Injectable} from '@angular/core';
import {InfosUserModel} from '../model/infosUserModel';
import {lastValueFrom} from 'rxjs';
import {HttpService} from '../../core/http.service';
import {Router} from '@angular/router';
import {StorageService} from '../../core/storage/storage.service';
import {TestModel} from '../model/testModel';
import {VaccineModel} from '../model/vaccineModel';
import {Network} from '@capacitor/network';
import {Display} from './display';

@Injectable({
  providedIn: 'root'
})
export class User {
  public userData: InfosUserModel = new class implements InfosUserModel {
    birthday: string;
    category: number;
    mail: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    medical_id: string;
    name: string;
    surname: string;
    tests_results: Array<TestModel>;
    jwtToken: string;
    _id: string;
    uuid: string;
    vaccine: Array<VaccineModel>;
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
    if (this.userData.jwtToken !== undefined) {
      if (status.connected) {
        lastValueFrom(this.httpService.getUser(this.userData.jwtToken))
          .then(async (res) => {
            this.userData = res;
            console.log(res);
          await this.storageService.setUserData(res);
          })
          .catch(async (err) => {
            await this.display.display(err);
          });
      } else {
       await this.router.navigateByUrl('/identification');
      }
    }
  }

  setUser(userData: any) {
    this.userData = userData;
    this.storageService.setUserData(userData).then();
  }

  checkMdp() {

  }
}
