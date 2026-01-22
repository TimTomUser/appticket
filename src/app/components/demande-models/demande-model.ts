export class AppDemandeModel {

  id: number;
  nom: string;
  email: string;
  sujet: string;
  region: string;
  departement: string;
  commune: string;
  message: string;

  constructor(id: number, nom: string, email: string, sujet: string, region: string, departement: string, commune: string, message: string) {
    this.id = id;
    this.nom = nom;
    this.email = email;
    this.sujet = sujet;
    this.region = region;
    this.departement = departement;
    this.commune = commune;
    this.message = message;
  }
}