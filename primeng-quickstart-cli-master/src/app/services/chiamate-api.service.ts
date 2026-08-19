import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChiamateAPIService {
  constructor(public httpClient: HttpClient) {}

  apiKey = 'api_key=3bbdef2bd5b89192e8dc5daf7ec7702d';
  language = 'language=it-IT';

  /**
   * Recupera dinamicamente le migliori offerte attualmente in vendita.
   * CheapShark ordina per DealRating, cioè quanto è conveniente la deal,
   * e non utilizziamo più una lista hardcoded di Steam App ID.
   */
  getDeals(): Observable<any[]> {
    return this.httpClient.get<any[]>('https://www.cheapshark.com/api/1.0/deals', {
      params: {
        onSale: '1',
        sortBy: 'DealRating',
        desc: '1',
        pageSize: '60'
      }
    });
  }

  searchGame(query: string): Observable<any[]> {
    return this.httpClient.get<any[]>('https://www.cheapshark.com/api/1.0/deals', {
      params: { title: query, pageSize: '20' }
    });
  }

  searchGeneri(idGenere: string): Observable<any> {
    return this.httpClient.get<any>(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&` + this.apiKey + `&language=it&page=1&sort_by=popularity.desc&with_genres=` + idGenere
    );
  }

  dettaglioFilm(id: number): Observable<any> {
    return this.httpClient.get<any>(`https://api.themoviedb.org/3/movie/` + id + '?' + this.apiKey + '&' + this.language);
  }
}
