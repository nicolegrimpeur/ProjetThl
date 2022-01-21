import {Injectable} from '@angular/core';
import {Storage} from '@capacitor/storage';
import {InfosUserModel} from '../../shared/model/infosUserModel';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }


  async setUserData(userData) {
    await Storage.set({
      key: 'userData',
      value: JSON.stringify(userData),
    });
  }

  async getUserData(): Promise<InfosUserModel> {
    const {value} = await Storage.get({key: 'userData'});
    return JSON.parse(value);
  }

  async setToken(token: string) {
    await Storage.set({
      key: 'token',
      value: token,
    });
  }

  async getToken(): Promise<string> {
    const {value} = await Storage.get({key: 'token'});
    return value as string;
  }
}
