// import { Component } from '@angular/core';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from './../app-service';



@Component({
  selector: 'app-comments',
  imports: [ReactiveFormsModule],
  templateUrl: './comments.components.html',
  styleUrl: './comments.components.scss',
})
export class CommentsComponents implements OnInit {
  // @Input() mon
  commentsReg: any = [];
  commentsDep: any = [];
  commentsCom: any = [];


  listRegions: any[] = [];
  listDepartements: any[] = [];
  listCommunes: any[] = [];

  // this.listRegions =;
  // this.listDepartements =;
  // this.listCommunes =;


  formulaire: FormGroup;
  constructor(private fb: FormBuilder, private monAppService: AppService, private cdr: ChangeDetectorRef) {
    //Grace au FormGroup je peut batir un [formBuilderOBJET]
    this.formulaire = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      //champ: TYPE [value default, [Veriffication]]
      sujet: ['', [Validators.required]],
      region: ['', [Validators.required]],
      departement: ['', [Validators.required]],
      commune: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }


  ngOnInit(): void {
    // this.fetchData();
    // this.getDepartements();
    // this.getCommunes();
    this.getRegionNew();
  }


 



  ////GET
  // fetchData() {
  //   this.monAppService.fetchData().subscribe((commentsReg) => {
  //     // console.log(commments);
  //     this.commentsReg = commentsReg;
  //   });
  // // }
  // getDepartements() {
  //   this.monAppService.getDepartements().subscribe((commentsDep) => {
  //     // console.log(commments);
  //     this.commentsDep = commentsDep;
  //   });
  // }

  // getCommunes() {
  //   this.monAppService.getCommunes().subscribe((commentsCom) => {
  //     // console.log(commments);
  //     this.commentsCom = commentsCom;
  //   });
  // }
  // maFonction(e: Event): void {
  //   const value = (e.target as HTMLSelectElement).value;
  //   //NormalHTMLInput
  //   //TYPE CAST get an element with particulary TYPE (JSON)
  //   console.log(value);
  // }


  // fetchData(e: Event) {
  //   const value = (e.target as HTMLSelectElement).value;
  // }
  // getDepartements(e: Event) {
  //   const value = (e.target as HTMLSelectElement).value;
  // }
  // getCommunes(e: Event) {
  //   const value = (e.target as HTMLSelectElement).value;
  // }

  postFormData() {
    if (this.formulaire.valid) {
      // console.log('Formulaire valide !');
      console.log(this.formulaire.value);
      let formData = new FormData();
      for (let key in this.formulaire.value) {
        formData.append(key, this.formulaire.value[key]);
      }

      this.monAppService.postFormData(formData).subscribe({
        next: (response) => {
          console.log(response);
          // console.log(JSON.parse(response));
          document.getElementById('monFormulaire')?.remove();
          let maReponse = JSON.parse(response);
          if (maReponse.success) {
            document.getElementById('confirmation')?.classList.remove('d-none');
          } else {
            document.getElementById('erreur')?.classList.remove('d-none');
          }
          // document.getElementById('monFormulaire')?.classList.add('d-block');
        },
        error: (err) => {
          switch (err.status) {
            case 401:
              console.log('Erreur 401: Unauthorized');
              break;
            case 403:
              console.log('Erreur 403: Forbidden');
              break;
          }
        }
      });
    }
  }

}


