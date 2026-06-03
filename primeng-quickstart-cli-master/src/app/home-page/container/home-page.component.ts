import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ChiamateAPIService } from 'src/app/services/chiamate-api.service';
import { PrimeIcons} from 'primeng/api';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

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
  if(this.query){
    this.searchBar(this.query);
  }else{
    this.reload();
  }


  
}

goToDettaglio(id:number){
  this.router.navigate(['dettaglio/' + id]);
  console.log(id)

}

searchBar(query:string){
  if(query){
    this.chiamateApi.searchFilm(query).subscribe(result=>{
      //chiamata durante la search al reload della pagina
      this.film=result;
      console.log(this.film);
      if(result.total_results == 0){
        this.errorMessage = "Nessun film trovato...";
      }
    })
  }
}
reload(){
  this.chiamateApi.getFilm().subscribe(result=>{
    this.film=result;
    console.log(this.errorMessage);
  })
}

}
