import {Component, OnInit} from '@angular/core';
import {Display} from '../shared/class/display';
import {Router} from '@angular/router';
import {HttpService} from '../core/http.service';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-citizen-declaration-page',
  templateUrl: './citizen-declaration-page.page.html',
  styleUrls: ['./citizen-declaration-page.page.scss'],
})
export class CitizenDeclarationPagePage implements OnInit {

  public contactTab = [' '];

  constructor(public display: Display, public router: Router, private httpService: HttpService) {
  }

  ngOnInit() {
  }

  addContact() {
    this.contactTab.push(' ');
  }

  inputNgFor(index, item) {
    return index;
  }

  declareContact() {
    firstValueFrom(this.httpService.declareCasContact(this.contactTab)).then(() => {
      this.display.display({code: 'Merci d\'avoir saisi vos cas contacts', color: 'success'});
      this.router.navigateByUrl('home').then();
    }).catch((error) => {
      this.display.display({code: `Une erreur est survenue: ${error.message}`, color: 'danger'});
    });

  }
}
