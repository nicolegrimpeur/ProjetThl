import {Injectable} from '@angular/core';
import {InfosUserModel} from '../model/infosUserModel';
import {lastValueFrom} from 'rxjs';
import {HttpService} from '../../core/http.service';
import {Router} from '@angular/router';
import {StorageService} from '../../core/storage/storage.service';

@Injectable({
    providedIn: 'root'
  })
export class User {
  public userData = new InfosUserModel();

  constructor(
    private httpService: HttpService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.getUser().then();
  }

  async getUser() {
    await this.storageService.getUserData().then(value => {
      if (value !== null) {
        this.userData = value;
      }
    });

    if (this.userData.token !== undefined) {
      lastValueFrom(this.httpService.getUser(this.userData.token))
        .then(res => {
          this.userData = res;
          this.storageService.setUserData(res).then();
        })
        .catch(err => {
          console.log('err : ', err);
        });
    }
    else {
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
