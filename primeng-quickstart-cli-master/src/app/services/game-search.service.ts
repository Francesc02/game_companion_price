import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameSearchService {
  private readonly api = 'https://www.cheapshark.com/api/1.0';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any[]> {
    const normalized = this.normalize(query);

    return this.http.get<any[]>(`${this.api}/games`, {
      params: { title: normalized, limit: '25' }
    }).pipe(
      switchMap(games => {
        if (!games?.length) {
          return this.searchDeals(normalized);
        }

        const ids = games
          .map(game => game?.gameID)
          .filter(Boolean)
          .slice(0, 25)
          .join(',');

        if (!ids) return of([]);

        return this.http.get<any>(`${this.api}/games`, {
          params: { ids, format: 'array' }
        }).pipe(
          map(response => this.mapGameLookupResponse(response))
        );
      })
    );
  }

  private searchDeals(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/deals`, {
      params: {
        title: query,
        pageSize: '60'
      }
    });
  }

  private mapGameLookupResponse(response: any): any[] {
    const games = Array.isArray(response)
      ? response
      : Object.values(response || {});

    return games.flatMap((game: any) => {
      const deals = Array.isArray(game?.deals) ? game.deals : [];
      return deals.map((deal: any) => ({
        ...deal,
        gameID: game.gameID ?? deal.gameID,
        title: game.info?.title ?? game.external ?? game.name ?? deal.title,
        thumb: game.info?.thumb ?? game.thumb ?? deal.thumb,
        steamAppID: game.info?.steamAppID ?? game.steamAppID ?? deal.steamAppID,
        salePrice: deal.price ?? deal.salePrice,
        normalPrice: deal.retailPrice ?? deal.normalPrice,
        savings: deal.savings,
        dealID: deal.dealID,
        storeID: deal.storeID
      }));
    });
  }

  private normalize(query: string): string {
    const value = query.trim().replace(/\s+/g, ' ');
    const aliases: { [key: string]: string } = {
      'gta 5': 'Grand Theft Auto V',
      'gta5': 'Grand Theft Auto V',
      'gta v': 'Grand Theft Auto V',
      'rdr 2': 'Red Dead Redemption 2',
      'rdr2': 'Red Dead Redemption 2',
      'fh5': 'Forza Horizon 5'
    };

    return aliases[value.toLowerCase()] || value;
  }
}
