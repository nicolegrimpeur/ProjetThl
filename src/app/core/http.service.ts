import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InfosQrModel} from '../shared/model/infosQrModel';
import {InfosUserModel} from '../shared/model/infosUserModel';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // private base = 'https://nicob.ovh/';
  // private base = 'http://localhost:5000/';
  private base = 'http://192.168.247.90:5000/';

  private baseUrl = this.base + 'api/';

  constructor(private readonly http: HttpClient) {
  }

  // getUserQr(token): Observable<InfosQrModel> {
  getUserQr(token): Observable<any> {
    const url = this.baseUrl + 'user/get/infosQr';
    const data = {data: token};
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.http.post(url, data, {headers: {'Content-Type': 'application/json'}});
  }

  // getUser(token): Observable<InfosUserModel> {
  getUser(token): Observable<any> {
    const url = this.baseUrl + 'user/get/infos';
    const data = {data: token};
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.http.post(url, data, {headers: {'Content-Type': 'application/json'}});
  }

  createUser(data){
    const destUrl  = this.baseUrl+'user/create-user';
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.http.post(destUrl,{body:data},{headers: {'Content-Type': 'application/json'}});
  }
}
