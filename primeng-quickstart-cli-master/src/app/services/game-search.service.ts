import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameSearchService {
  private readonly api = 'https://www.cheapshark.com/api/1.0';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any[]> {
    const normalized = this.normalize(query);

    // CheapShark's /deals endpoint is the most reliable way to get
    // the actual current offers for a title. RootComponent already
    // groups these deals by gameID, so multiple stores won't become
    // duplicate cards.
    return this.http.get<any[]>(`${this.api}/deals`, {
      params: {
        title: normalized,
        pageSize: '60',
        sortBy: 'DealRating',
        desc: '1'
      }
    }).pipe(
      catchError(error => {
        console.error('Errore ricerca CheapShark:', error);
        return of([]);
      })
    );
  }

  private normalize(query: string): string {
    const value = query.trim().replace(/\s+/g, ' ');

    const aliases: { [key: string]: string } = {
      'gta 5': 'Grand Theft Auto V',
      'gta5': 'Grand Theft Auto V',
      'gta v': 'Grand Theft Auto V',
      'grand theft auto 5': 'Grand Theft Auto V',
      'rdr 2': 'Red Dead Redemption 2',
      'rdr2': 'Red Dead Redemption 2',
      'fh5': 'Forza Horizon 5'
    };

    return aliases[value.toLowerCase()] || value;
  }
}
