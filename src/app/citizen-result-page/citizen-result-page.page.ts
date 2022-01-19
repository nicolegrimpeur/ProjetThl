import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-citizen-result-page',
  templateUrl: './citizen-result-page.page.html',
  styleUrls: ['./citizen-result-page.page.scss'],
})
export class CitizenResultPagePage implements OnInit {
  public operation1 = {
    nature:'Test',
    date: '11 Janvier 2021',
    type: 'PCR',
    result: 'positif'
  };
  public operation2 = {
    nature:'Vaccin',
    date: '13 Janvier 2021',
    type: 'Moderna',
  };
  public operation3 = {
    nature:'Vaccin',
    date: '02 Février 2021',
    type: 'Pfizer',
  };
  public operation4 = {
    nature:'Test',
    date: '11 Janvier 2022',
    type: 'Antigénique',
    result: 'Négatif'
  };
  public userData = {
    operations: [this.operation1, this.operation2, this.operation3, this.operation4],
  };
  constructor() { }

  ngOnInit() {
  }
  inputNgFor(index, item){
    return index;
  }

  loadResults(){
    //(Back) : Accéder à tous les résultats que l'utilisateur possède et les mettre dans la variable userData.operations[]

  }

}
