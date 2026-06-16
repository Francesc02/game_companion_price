import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChiamateAPIService } from 'src/app/services/chiamate-api.service';

interface GameDeal {
  gameID: string;
  dealID: string;
  title: string;
  thumb: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  metacriticScore: string;
  storeID: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  games: GameDeal[] | null = null;
  query: string | undefined;
  errorMessage: string | null = null;
  loading: boolean = false;
  wishlist: Set<string> = new Set();

  private storeNames: { [key: string]: string } = {
    '1': 'Steam', '2': 'GamersGate', '3': 'GreenManGaming',
    '7': 'GOG', '8': 'Origin', '11': 'Humble Store',
    '13': 'Uplay', '15': 'Fanatical', '25': 'Epic Games',
    '29': 'IndieGala', '30': 'Blizzard'
  };

  constructor(
    public chiamateApi: ChiamateAPIService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParams['query'];
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      if (this.query) {
        this.searchBar(this.query);
      } else {
        this.reload();
      }
    });
  }

  searchBar(query: string | undefined): void {
    if (!query) return;
    this.loading = true;
    this.errorMessage = null;
    this.games = null;

    this.chiamateApi.searchGame(query).subscribe({
      next: (results: GameDeal[]) => {
        this.games = results;
        console.log(results);
        this.loading = false;
        if (results.length === 0) {
          this.errorMessage = 'Nessun gioco trovato per "' + query + '"';
        }
      },
      error: () => {
        this.errorMessage = 'Errore durante la ricerca. Riprova più tardi.';
        this.loading = false;
      }
    });
  }

  reload(): void {
    this.loading = true;
    this.chiamateApi.getDeals().subscribe({
      next: (results: GameDeal[]) => {
        this.games = results;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Impossibile caricare le offerte.';
        this.loading = false;
      }
    });
  }

  goToDeal(dealID: string): void {
    window.open('https://www.cheapshark.com/redirect?dealID=' + dealID, '_blank');
  }

  getStoreName(storeID: string): string {
    return this.storeNames[storeID] || 'Store #' + storeID;
  }

  toggleWishlist(gameID: string): void {
    if (this.wishlist.has(gameID)) {
      this.wishlist.delete(gameID);
    } else {
      this.wishlist.add(gameID);
    }
  }

  isInWishlist(gameID: string): boolean {
    return this.wishlist.has(gameID);
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/no-cover.png';
  }
}