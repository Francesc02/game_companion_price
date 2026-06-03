import { Component } from '@angular/core';
import { ChiamateAPIService } from '../services/chiamate-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generi',
  templateUrl: './generi.component.html',
  styleUrls: ['./generi.component.css']
})
export class GeneriComponent {
  film: unknown | null = null;
  query:string | undefined;
  errorMessage:string|null;

  constructor(public chiamateApi:ChiamateAPIService,public route:ActivatedRoute,public router:Router){}



  ngOnInit(): void {
    this.query = JSON.stringify(this.route.snapshot.queryParams['query']);
    this.route.params.subscribe(params => {
      this.query = params['query'];
  }); 
  console.log(this.query);
  this.searchGeneri();
}

goToDettaglio(id:number){
  this.router.navigate(['dettaglio/' + id]);
  console.log(id)

}

searchGeneri(){

    this.chiamateApi.searchGeneri(this.query).subscribe(result=>{
      //chiamata durante la search al reload della pagina
      let filmFiltratiPerGenere;

    

      this.film=result;
      console.log(this.film);
      if(result.total_results == 0){
        this.errorMessage = "Nessun film trovato...";
      }
    })
  }
}



