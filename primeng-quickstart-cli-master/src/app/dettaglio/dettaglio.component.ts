import { Component, inject } from '@angular/core';
import { ChiamateAPIService } from '../services/chiamate-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.component.html',
  styleUrls: ['./dettaglio.component.css']
})
export class DettaglioComponent {
  id:number;
  film: unknown | null=null;
  chiamateApi: ChiamateAPIService = inject(ChiamateAPIService);
  route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.id = params['id'];
    console.log(this.id);


    this.chiamateApi.dettaglioFilm(this.id).subscribe(result=>{
      this.film=result;
      console.log(this.film)
    })
}); 

  
  }


}
