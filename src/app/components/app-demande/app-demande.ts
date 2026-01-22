import { Component, Input } from '@angular/core';
// import { AppDemandeModel } from '../demande-models/demande-model';

@Component({
  selector: 'app-app-demande',
  imports: [],
  templateUrl: './app-demande.html',
  styleUrl: './app-demande.scss',
})
export class AppDemande {
  @Input() monAppDemande: any = [];

}
