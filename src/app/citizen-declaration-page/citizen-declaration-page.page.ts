import { Component, OnInit } from '@angular/core';
import { Display } from '../shared/class/display';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citizen-declaration-page',
  templateUrl: './citizen-declaration-page.page.html',
  styleUrls: ['./citizen-declaration-page.page.scss'],
})
export class CitizenDeclarationPagePage implements OnInit {

  public contactTab = [" "];
  constructor(public display: Display, public router: Router) { }

  ngOnInit() {
  }

  addContact(){
    this.contactTab.push(" ");
  }
  
  inputNgFor(index, item){
    return index;
  }

  declareContact(){
    console.log(this.contactTab);
    this.display.display({code:"Merci d'avoir saisi vos cas contacts", color:"success"});
    this.router.navigateByUrl('home').then();
  }
}
