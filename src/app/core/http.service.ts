/* eslint-disable @typescript-eslint/naming-convention */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InfosQrModel} from '../shared/model/infosQrModel';
import {ILoginResponse, InfosUserModel, IRegisterResponse} from '../shared/model/infosUserModel';
import {RegisterData} from '../shared/model/registerDataUserModel';
import {IdModel} from '../shared/model/idModel';
import {ICertificate} from '../shared/model/certificates';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // private base = 'https://nicob.ovh/';
  //private base = 'http://localhost:5000/';
  // private base = 'http://192.168.236.90:5000/';
  private base = 'https://425e-93-27-52-26.ngrok.io';
  private baseUrl = this.base + '/';

  private authToken = '';

  constructor(private readonly http: HttpClient) {

  }

  public setAuthToken(token: string): void {
    this.authToken = token;
  }

  // getUserQr(token): Observable<InfosQrModel> {
  getUserQr(token): Observable<InfosQrModel> {
    const url = this.baseUrl + 'qr/' + token;
    return this.http.get(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    }) as Observable<InfosQrModel>;
  }

  // getUser(token): Observable<InfosUserModel> {
  getUser(): Observable<{ user: InfosUserModel }> {
    const url = this.baseUrl + 'users/self';
    return this.http.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`
      }
    }) as Observable<{ user: InfosUserModel }>;
  }

  getCertificates(): Observable<{ certificates: Array<ICertificate> }> {
    const url = this.baseUrl + 'users/self/certificates';
    return this.http.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`
      }
    }) as Observable<{ certificates: Array<ICertificate> }>;
  }

  login(email, password): Observable<ILoginResponse> {
    const url = this.baseUrl + 'auth/login';
    const data = {email, password};
    return this.http.post(url, data, {headers: {'Content-Type': 'application/json',}}) as Observable<ILoginResponse>;
  }

  createUser(data: RegisterData): Observable<IRegisterResponse> {
    const destUrl = this.baseUrl + 'auth/register';
    return this.http.post(destUrl, data, {headers: {'Content-Type': 'application/json'}}) as Observable<IRegisterResponse>;
  }

  deleteUser(): Observable<IdModel> {
    const url = this.baseUrl + 'users/self';
    return this.http.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`
      }
    }) as Observable<IdModel>;
  }

  deleteData(certificateId: string): Observable<{ certificate: ICertificate }> {
    const url = this.baseUrl + 'certificates/' + certificateId;
    return this.http.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`
      }
    }) as Observable<{ certificate: ICertificate }>;
  }

  addVaccine(data: Partial<ICertificate>): Observable<{ certificate: ICertificate }> {
    const destUrl = this.baseUrl + 'users/self/certificates';
    return this.http.post(destUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`
      }
    }) as Observable<{ certificate: ICertificate }>;
  }

  addTest(data: Partial<ICertificate>): Observable<{ certificate: ICertificate }> {
    const destUrl = this.baseUrl + 'users/self/certificates';
    return this.http.post(destUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`
      }
    }) as Observable<{ certificate: ICertificate }>;
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<{ user: InfosUserModel }> {
    const url = this.baseUrl + 'users/self';

    return this.http.patch(url, {
      oldPassword,
      newPassword
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`
      }
    }) as Observable<{ user: InfosUserModel }>;
  }

  /*
    checkMedic(medical_id: number, name: string, surname: string): Observable<InfosUserModel> {
      const url = this.baseUrl + 'medics/checkCode';
      const data = {medical_idData: medical_id, nameData: name, surnameData: surname};

      return this.http.post(url, data, {headers: {'Content-Type': 'application/json'}}) as Observable<InfosUserModel>;
    }*/

  /*uploadImg(blobData, token, format): Observable<any> {
    const formData = new FormData();
    formData.append('file', blobData, token + '.' + format);
    formData.append('name', token);

    const url = this.baseUrl + 'upload/';
    return this.http.post(url, formData);
  }

  downloadImg(id): Observable<any> {
    const url = this.baseUrl + 'get/residence' + id;
    return this.http.get<any>(url, {responseType: 'blob' as 'json'});
  }*/
  declareCasContact(emails: Array<string>): Observable<{ user: InfosUserModel }> {
    const url = this.baseUrl + 'users/:id/contact';
    return this.http.post(url, {emails}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`
      }
    }) as Observable<{ user: InfosUserModel }>;
  }


}

