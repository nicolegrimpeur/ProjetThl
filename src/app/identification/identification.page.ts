import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.page.html',
  styleUrls: ['./identification.page.scss'],
})
export class IdentificationPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  connectToAccount(){
    this.router.navigateByUrl('login').then();
  }
  createAccount(){
    this.router.navigateByUrl('register').then();
  }

}
