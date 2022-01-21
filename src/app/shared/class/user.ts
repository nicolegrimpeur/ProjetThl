import {forwardRef, Inject, Injectable} from '@angular/core';
import {InfosUserModel} from '../model/infosUserModel';
import {lastValueFrom} from 'rxjs';
import {HttpService} from '../../core/http.service';
import {Router} from '@angular/router';
import {StorageService} from '../../core/storage/storage.service';
import {Network} from '@capacitor/network';
import {Display} from './display';


type UserDataField = Partial<InfosUserModel> & { loggedIn?: boolean };

const DEFAULT_USER_DATA = {
  loggedIn: false,
  category: 0
};

@Injectable({
  providedIn: 'root',
})
export class User {
  public userData: UserDataField = DEFAULT_USER_DATA;
  private jwtToken?: string;

  constructor(
    @Inject(forwardRef(() => HttpService)) private httpService: HttpService,
    private router: Router,
    private storageService: StorageService,
    private display: Display
  ) {
    this.refreshUser = this.refreshUser.bind(this);
    this.refreshUser();
  }

  async loadData() {
    this.userData = await this.storageService.getUserData();
    if (!this.userData) {
      this.userData = DEFAULT_USER_DATA;
    }
    this.jwtToken = await this.storageService.getToken();
    if (this.jwtToken) {
      this.httpService.setAuthToken(this.jwtToken);
    }
  }

  async refreshUser() {
    const status = await Network.getStatus();
    await this.loadData();
    if (this.jwtToken) {
      if (status.connected) {
        return lastValueFrom(this.httpService.getUser())
          .then(async (res) => {
            this.setUser(res.user);
            return res.user;
          })
          .catch(async (err) => {
            await this.display.display(err);
            throw err;
          });
      }
    } else {
      await this.router.navigateByUrl('/identification');
    }
  }

  setUser(userData: UserDataField) {
    this.userData = userData;
    this.userData.loggedIn = true;
    return this.storageService.setUserData(userData);
  }

  setToken(token: string) {
    this.jwtToken = token;
    this.httpService.setAuthToken(token);
    return this.storageService.setToken(token);
  }

  getToken(): string | undefined {
    return this.jwtToken;
  }
  setPassToken(token: string) {
    return this.storageService.setToken(token);
  }

  getPassToken(): Promise<string | undefined> {
    return this.storageService.getPassToken();
  }
  getUserData(): UserDataField {
    if (!this.userData) {
      throw new Error('Undefined UserData');
    }
    return this.userData;
  }

  isLoggedIn(): boolean {
    // eslint-disable-next-line no-underscore-dangle
    return this.jwtToken && this.userData?.loggedIn && typeof this.userData?._id === 'string';
  }
}
