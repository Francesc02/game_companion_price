import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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


  getFilm(): Observable<any> {
    // return this.httpClient.get<any>(`https://api.themoviedb.org/3/movie/11?api_key=3bbdef2bd5b89192e8dc5daf7ec7702d`);
    return this.httpClient.get<any>(
      `https://api.themoviedb.org/3/discover/movie?` +
        this.apiKey +
        '&' +
        this.language
    );
  }

  searchFilm(query: string): Observable<any> {
    return this.httpClient.get<any>(
      `https://api.themoviedb.org/3/search/movie?query=` +
        query +
        '&' +
        this.apiKey +
        '&' +
        this.language
    );
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
