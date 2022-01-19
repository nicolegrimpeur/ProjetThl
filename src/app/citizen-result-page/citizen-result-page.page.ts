import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-citizen-result-page',
  templateUrl: './citizen-result-page.page.html',
  styleUrls: ['./citizen-result-page.page.scss'],
})
export class CitizenResultPagePage implements OnInit {
  public userData = {
    operations: ["Test PCR", "Vaccin Moderna", "Vaccin Pfizer", "Test Antigénique"],
  };
  constructor() { }

  ngOnInit() {
  }

  show(){
    console.log(this.userData.operations[0]);
  }
  loadResults(){
    //(Back) : Accéder à tous les résultats que l'utilisateur possède

  }

}
