/* eslint-disable @typescript-eslint/naming-convention */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InfosQrModel} from '../shared/model/infosQrModel';
import {InfosUserModel} from '../shared/model/infosUserModel';
import {RegisterData} from '../shared/model/registerDataUserModel';
import {VaccineModel} from '../shared/model/vaccineModel';
import {Component} from '@angular/core';

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
  getUserQr(token): Observable<any> {
    const url = this.baseUrl + 'user/get/infosQr';
    const data = {data: token};
    return this.http.get(url, {headers: {'Content-Type': 'application/json',Authorization: `Bearer ${token}`}});
  }

  // getUser(token): Observable<InfosUserModel> {
  getUser(token): Observable<any> {
    const url = this.baseUrl + 'user/get/infos';
    const data = {data: token};
    return this.http.get(url, {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`}});
  }

  login(mail, password): Observable<any> {
    const url = this.baseUrl + 'user/login';
    const data = {mail, password};
    return this.http.post(url, data, {headers: {'Content-Type': 'application/json'}});
  }

  createUser(data: RegisterData) {
    const destUrl = this.baseUrl + 'user/create-user';
    return this.http.post(destUrl, data, {headers: {'Content-Type': 'application/json'}});
  }

  deleteUser(token: string, psw: string) {
    const url = this.baseUrl + 'user/delete-user';
    const data = {tokenData: token, pswData: psw};

    return this.http.post(url, data, {headers: {'Content-Type': 'application/json'}});
  }

  deleteData(token: string, password: string): Observable<any> {
    const url = this.baseUrl + 'user/deleteData';
    const data = {token, password};

    return this.http.post(url, data, {headers: {'Content-Type': 'application/json'}});
  }

  addVaccine(data) {
    const destUrl = this.baseUrl + 'user/add/vaccine';
    return this.http.post(destUrl, data, {headers: {'Content-Type': 'application/json'}});
  }

  addTest(data) {
    const destUrl = this.baseUrl + 'user/add/test';
    return this.http.post(destUrl, data, {headers: {'Content-Type': 'application/json'}});
  }

  modifPsw(token: string, psw: string, newPsw: string) {
    const url = this.baseUrl + 'user/modif-psw';
    const data = {tokenData: token, pswData: psw, newPswData: newPsw};

    return this.http.post(url, data, {headers: {'Content-Type': 'application/json'}});
  }

  checkMedic(medical_id: number, name: string, surname: string): Observable<any> {
    const url = this.baseUrl + 'medics/checkCode';
    const data = {medical_idData: medical_id, nameData: name, surnameData: surname};

    return this.http.post(url, data, {headers: {'Content-Type': 'application/json'}});
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

}

