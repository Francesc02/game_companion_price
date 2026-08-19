import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameSearchService {
  constructor(private http: HttpClient) {}

  search(query: string): Observable<any[]> {
    const normalized = this.normalize(query);

    return this.http.get<any[]>('https://www.cheapshark.com/api/1.0/games', {
      params: { title: normalized, limit: '25' }
    }).pipe(
      switchMap(games => {
        if (!games.length) return this.fallback(normalized);

        const ids = games.map(game => game?.gameID).filter(Boolean).slice(0, 25).join(',');
        return this.lookupGames(ids);
      })
    );
  }

  private lookupGames(ids: string): Observable<any[]> {
    return this.http.get<any[]>('https://www.cheapshark.com/api/1.0/games', {
      params: { ids, format: 'array' }
    }).pipe(
      map(games => games.flatMap(game => {
        const deals = Array.isArray(game?.deals) ? game.deals : [];
        return deals.map((deal: any) => ({
          ...deal,
          gameID: game.gameID,
          title: game.info?.title || game.name,
          thumb: game.info?.thumb || game.thumb,
          steamAppID: game.info?.steamAppID || game.steamAppID
        }));
      }))
    );
  }

  private fallback(query: string): Observable<any[]> {
    const aliases: { [key: string]: string } = {
      'gta 5': 'Grand Theft Auto V',
      'gta5': 'Grand Theft Auto V',
      'gta v': 'Grand Theft Auto V',
      'rdr 2': 'Red Dead Redemption 2',
      'rdr2': 'Red Dead Redemption 2',
      'fh5': 'Forza Horizon 5'
    };

    const alias = aliases[query.toLowerCase()];
    if (!alias) {
      return this.http.get<any[]>('https://www.cheapshark.com/api/1.0/deals', {
        params: { title: query, pageSize: '20' }
      });
    }

    return this.http.get<any[]>('https://www.cheapshark.com/api/1.0/games', {
      params: { title: alias, limit: '25' }
    }).pipe(
      switchMap(games => {
        if (!games.length) {
          return this.http.get<any[]>('https://www.cheapshark.com/api/1.0/deals', {
            params: { title: alias, pageSize: '20' }
          });
        }
        const ids = games.map(game => game?.gameID).filter(Boolean).slice(0, 25).join(',');
        return this.lookupGames(ids);
      })
    );
  }

  private normalize(query: string): string {
    const value = query.trim().replace(/\s+/g, ' ');
    const aliases: { [key: string]: string } = {
      'gta 5': 'Grand Theft Auto V',
      'gta5': 'Grand Theft Auto V',
      'gta v': 'Grand Theft Auto V'
    };
    return aliases[value.toLowerCase()] || value;
  }
}
