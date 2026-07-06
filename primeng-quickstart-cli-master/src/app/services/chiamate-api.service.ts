import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

@Injectable({
  providedIn: 'root',
})

export class ChiamateAPIService {
 
 
  constructor(public httpClient: HttpClient) {}
  apiKey = 'api_key=3bbdef2bd5b89192e8dc5daf7ec7702d';
  language = 'language=it-IT';
  //  includeVideo='include_video=true';
  
// Configura le credenziali


  getDeals(): Observable<any[]> {
  // ID dei giochi più famosi su CheapShark
  const famousGameIDs = [
    '146825', // Cyberpunk 2077
    '226320', // Elden Ring  
    '1091500', // Cyberpunk (Steam ID alternativo)
    '292030', // The Witcher 3
    '1245620', // Elden Ring
    '1593500', // God of War
    '1817070', // Hogwarts Legacy
    '1938090', // Call of Duty
  ];

  const requests = famousGameIDs.map(id =>
    this.httpClient.get<any[]>(`https://www.cheapshark.com/api/1.0/deals`, {
      params: { steamAppID: id, pageSize: '1' }
    })
  );

  return forkJoin(requests).pipe(
    map((results: any[][]) => results.flat().filter(g => g))
  );
}

  searchGame(query: string): Observable<any[]> {
  return this.httpClient.get<any[]>('https://www.cheapshark.com/api/1.0/deals', {
    params: { title: query, pageSize: '20' }
  });
}
  searchGeneri(idGenere:string): Observable<any>{
    return this.httpClient.get<any>(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&` + this.apiKey + `&language=it&page=1&sort_by=popularity.desc&with_genres=`+idGenere
        
        // '&' +
        // this.language
    );

    //https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=it&page=1&sort_by=popularity.desc&with_genres=16
  }

  dettaglioFilm(id:number):Observable<any>{
    return this.httpClient.get<any>(`https://api.themoviedb.org/3/movie/`+ id + '?' + this.apiKey + '&' + this.language);
  }
}


