// import { Component, signal } from '@angular/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

import { AppMenu } from './components/app-menu/app-menu';
// import { AppHeader } from './components/app-header/app-header';
// import { CommentsComponents } from './comments/comments.components';
// import { AppDemande } from './components/app-demande/app-demande';
import { AppFooter } from './components/app-footer/app-footer';

// import { AppService } from './app-service/app-service';
import { AppService } from './app-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppMenu, AppFooter],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
// RouterOutlet, FOR  Standalone imports [after]
export class App implements OnInit {
  protected readonly title: string = 'appticket';

  dataDemande: any[] = [];

  listRegions: any[] = [];
  listDepartements: any[] = [];
  listCommunes: any[] = [];

  constructor(private app: AppService, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.monFunction();
    this.getRegionNew();
    

  }
  monFunction() {
    this.app.getTableJsonDemande()?.subscribe({
      next: (response) => {
        let resultArray = JSON.parse(response);

        // this.appRegions = result.region;
        // this.appDepartements = result.departement;
        // this.appCommunnes = result.commune;


        this.dataDemande = resultArray.demande;

        // this.dataLiensMenu = result.menu;
        // this.dataNosAdresses = result.adresses;
        // this.dataSavoirsFaire = result.articlesSavoirsFaire;
        // this.dataPostsReseauxSociaux = result.postsReseauxSociaux;
        // this.dataArticlesContact = result.articlesContact;

        this.cdr.detectChanges();
      },
      error: (err) => { console.error('Erreur API', err) }

    });
  }

  getRegionNew() {
   document?.querySelector('#region')?.addEventListener('change', function (e) {
      // var codeRegion = document.getElementById('region').value;
      fetch("https://geo.api.gouv.fr/region/")?.then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(data => {
        for (var i = 0; i < data.length; i++) {
          document?.querySelector('#region')?.innerHTML = "<option value='" + data[i].nom + "'>" + data[i].nom + "</option>";
        }
      });

    //   }).catch(error => {
    //     { console.error('Error:', error); }
    //   });
    // });
//   }

// }
    });
  }
}