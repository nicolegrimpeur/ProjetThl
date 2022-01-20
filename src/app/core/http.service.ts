/* eslint-disable @typescript-eslint/naming-convention */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InfosQrModel} from '../shared/model/infosQrModel';
import {ILoginResponse, InfosUserModel} from '../shared/model/infosUserModel';
import {RegisterData} from '../shared/model/registerDataUserModel';
import {VaccineModel} from '../shared/model/vaccineModel';
import {Component} from '@angular/core';
import {DeleteUserModel} from '../shared/model/deleteUserModel';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // private base = 'https://nicob.ovh/';
  // private base = 'http://localhost:5000/';
  private base = 'http://192.168.236.90:5000/';

  private baseUrl = this.base + 'api/';

  constructor(private readonly http: HttpClient) {
  }

  // getUserQr(token): Observable<InfosQrModel> {
  getUserQr(token): Observable<InfosQrModel> {
    const url = this.baseUrl + 'user/get/infosQr';
    const data = {data: token};
    return this.http.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }) as Observable<InfosQrModel>;
  }

  // getUser(token): Observable<InfosUserModel> {
  getUser(token): Observable<InfosUserModel> {
    const url = this.baseUrl + 'user/get/infos';
    const data = {data: token};
    // eslint-disable-next-line max-len
    return this.http.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }) as Observable<InfosUserModel>;
  }

  login(mail, password): Observable<InfosUserModel> {
    const url = this.baseUrl + 'user/login';
    const data = {mail, password};
    return this.http.post(url, data, {headers: {'Content-Type': 'application/json'}}) as Observable<InfosUserModel>;
  }

  createUser(data: RegisterData): Observable<InfosUserModel> {
    const destUrl = this.baseUrl + 'user/create-user';
    return this.http.post(destUrl, data, {headers: {'Content-Type': 'application/json'}}) as Observable<InfosUserModel>;
  }

  deleteUser(token: string, psw: string): Observable<DeleteUserModel> {
    const url = this.baseUrl + 'user/delete-user';
    const data = {tokenData: token, pswData: psw};

    return this.http.post(url, data, {headers: {'Content-Type': 'application/json'}}) as Observable<DeleteUserModel>;
  }

  deleteData(token: string, password: string): Observable<DeleteUserModel> {
    const url = this.baseUrl + 'user/deleteData';
    const data = {token, password};
    return this.http.post(url, data, {headers: {'Content-Type': 'application/json'}}) as Observable<DeleteUserModel>;
  }

  addVaccine(data): Observable<InfosUserModel> {
    const destUrl = this.baseUrl + 'user/add/vaccine';
    return this.http.post(destUrl, data, {headers: {'Content-Type': 'application/json'}}) as Observable<InfosUserModel>;
  }

  addTest(data): Observable<InfosUserModel> {
    const destUrl = this.baseUrl + 'user/add/test';
    return this.http.post(destUrl, data, {headers: {'Content-Type': 'application/json'}}) as Observable<InfosUserModel>;
  }

  modifPsw(token: string, psw: string, newPsw: string): Observable<DeleteUserModel> {
    const url = this.baseUrl + 'user/modif-psw';
    const data = {tokenData: token, pswData: psw, newPswData: newPsw};
    return this.http.post(url, data, {headers: {'Content-Type': 'application/json'}}) as Observable<DeleteUserModel>;
  }

  checkMedic(medical_id: number, name: string, surname: string): Observable<InfosUserModel> {
    const url = this.baseUrl + 'medics/checkCode';
    const data = {medical_idData: medical_id, nameData: name, surnameData: surname};

    return this.http.post(url, data, {headers: {'Content-Type': 'application/json'}}) as Observable<InfosUserModel>;
  }

  uploadImg(blobData, token, format): Observable<any> {
    const formData = new FormData();
    formData.append('file', blobData, token + '.' + format);
    formData.append('name', token);

    const url = this.baseUrl + 'upload/';
    return this.http.post(url, formData);
  }

  downloadImg(id): Observable<any> {
    const url = this.baseUrl + 'get/residence' + id;
    return this.http.get<any>(url, {responseType: 'blob' as 'json'});
  }
  declareCasContact(email: string){
    const url = this.baseUrl +'user/:id/cas-contact';
    return this.http.post(url,email,{headers: {'Content-Type': 'application/json'}});
  }


}

