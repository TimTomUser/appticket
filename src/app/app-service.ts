import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseUrl = `https://geo.api.gouv.fr`;
  constructor(private monHttpClient: HttpClient) { }

  fetchData() {
    return this.monHttpClient.get(`${this.baseUrl}/regions`);
  }

  // getDepartements() {
  //   return this.monHttpClient.get(`${this.baseUrl}/departements`);
  // }

  // getCommunes() {
  //   return this.monHttpClient.get(`${this.baseUrl}/communes`);
  // }
  // }
  postFormData(formData: FormData) {
    return this.monHttpClient.post('http://exercice-api.loc/ticketing.php', formData, {
      headers: { "Authorization": "VBnAzKpOLlf5DZSNpNuXJmvg4" },
      responseType: 'text'
    });
  }
  //INSERTION MonFormulaire.value;
  //function(param1, param2);

  // }
  getTableJsonDemande() {
    return this.monHttpClient.get('http://exercice-api.loc/ticketing.php', {
      headers: { "Authorization": "VBnAzKpOLlf5DZSNpNuXJmvg4" },
      responseType: 'text'
    });
  }

}