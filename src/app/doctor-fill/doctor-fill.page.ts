import { Component, OnInit } from '@angular/core';
import {Display} from "../shared/class/display";

@Component({
  selector: 'app-doctor-fill',
  templateUrl: './doctor-fill.page.html',
  styleUrls: ['./doctor-fill.page.scss'],
})
export class DoctorFillPage implements OnInit {
  public fill = '';//UX
  public date = '';//Graphique
  /*Data*/
  public vaccineData = {
    lab: '',
    mail: '',
    date: ''
  };
  public testData = {
    type: '',
    date: '',
    mail: '',
    result: '',
    variant: ''
  };

  constructor(public display: Display) { }

  ngOnInit() {
  }
  myFormatDate(dateForm){
    const tmp = new Date(dateForm);
    this.date = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric'}).format(tmp);
  }
  uploadVaccineData(){
    //(Back), il faut envoyer les données dans la BDD :)
    //Graphiques
    this.makeToast();
  }
  uploadTestData(){
    //(Back), il faut envoyer les données dans la BDD :)
    //Graphiques
    this.makeToast();
  }
  makeToast(){
    this.display.display({code:"Données saisies", color:"success"});
  }
}
