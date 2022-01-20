import {Injectable} from '@angular/core';
import {InfosUserModel} from '../model/infosUserModel';
import {lastValueFrom, retry} from 'rxjs';
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
  public userData?: InfosUserModel;
  private jwtToken?: string;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private storageService: StorageService,
    private display: Display
  ) {
    this.loadData().then(this.refreshUser);
  }

  async loadData() {
    this.userData = await this.storageService.getUserData();
    this.jwtToken = await this.storageService.getToken();
  }

  async refreshUser() {
    const status = await Network.getStatus();
    if (this.jwtToken) {
      console.log('status', status.connected);
      if (status.connected) {
        lastValueFrom(this.httpService.getUser(this.jwtToken))
          .then(async (res) => Promise.all([this.setUser(res.user),
            this.setToken(res.token)]))
          .catch(async (err) => {
            await this.display.display(err);
          });
      }
    } else {
      await this.router.navigateByUrl('/identification');
    }
  }

  setUser(userData: any) {
    this.userData = userData;
    return this.storageService.setUserData(userData);
  }

  setToken(token: string) {
    this.jwtToken = token;
    return this.storageService.setToken(token);
  }

  getToken(): string | undefined {
    return this.jwtToken;
  }

  getUserData(): InfosUserModel | undefined {
    return this.userData;
  }
}
