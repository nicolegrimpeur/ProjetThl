import { Component, OnInit } from '@angular/core';
import {Display} from '../shared/class/display';
import {lastValueFrom} from 'rxjs';
import {HttpService} from '../core/http.service';

@Component({
  selector: 'app-doctor-fill',
  templateUrl: './doctor-fill.page.html',
  styleUrls: ['./doctor-fill.page.scss'],
})
export class DoctorFillPage implements OnInit {
  public fill = '';//UX
  public date = '';//Graphique
  public mail ='';
  /*Data*/
  public vaccineData = {
    lab: '',
    date: ''
  };
  public testData = {
    type: '',
    date: '',
    result: '',
    variant: ''
  };

  constructor(public display: Display, private httpService: HttpService) { }

  ngOnInit() {
  }
  myFormatDate(dateForm){
    const tmp = new Date(dateForm);
    this.date = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric'}).format(tmp);
  }
  uploadTestData(){
    console.log(this.testData.date, this.testData.variant,this.testData.result === 'Positif'?true:false);
      lastValueFrom(this.httpService.addTest({
        mail: this.mail,
        variant: this.testData.variant,
        date: this.testData.date,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        type_test: this.testData.type,
        positif: this.testData.result === 'Positif'?true:false
      }))
        .then(res => {
          console.log('res:',res);
        })
        .catch(err => {
          console.log('err:',err);
        });
    //Graphiques
    this.makeToast();
  }
  makeToast(){
    this.display.display({code:'Données saisies', color:'success'});
  }
  uploadVaccineData() {
    lastValueFrom(this.httpService.addVaccine({
      mail: this.mail,
      lab: this.vaccineData.lab,
      date: this.vaccineData.date
    }))
      .then(res => {
        console.log('res:',res);
        this.makeToast();
      })
      .catch(err => {
        console.log('err:',err);
      });
  }
}
