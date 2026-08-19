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
   * Recupera giochi famosi che sono realmente in offerta in questo momento.
   * Non usiamo ID hardcoded: la classifica viene ricostruita ad ogni accesso
   * usando segnali dinamici di popolarità/qualità presenti su CheapShark.
   */
  getDeals(): Observable<any[]> {
    const popularGames$ = this.httpClient.get<any[]>(
      'https://www.cheapshark.com/api/1.0/deals',
      {
        params: {
          onSale: '1',
          sortBy: 'ReviewCount',
          desc: '1',
          minimumReviewCount: '5000',
          steamRating: '70',
          pageSize: '60'
        }
      }
    );

    const topRatedGames$ = this.httpClient.get<any[]>(
      'https://www.cheapshark.com/api/1.0/deals',
      {
        params: {
          onSale: '1',
          sortBy: 'Metacritic',
          desc: '1',
          metacritic: '75',
          pageSize: '60'
        }
      }
    );

    return forkJoin([popularGames$, topRatedGames$]).pipe(
      map(([popularGames, topRatedGames]) => {
        // Prima i giochi popolari, poi quelli molto apprezzati.
        // Manteniamo l'ordine restituito da CheapShark e rimuoviamo i duplicati.
        const uniqueGames = new Map<string, any>();

        [...popularGames, ...topRatedGames].forEach(game => {
          if (game?.gameID && !uniqueGames.has(game.gameID)) {
            uniqueGames.set(game.gameID, game);
          }
        });

        return Array.from(uniqueGames.values()).slice(0, 60);
      })
    );
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
