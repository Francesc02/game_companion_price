import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChiamateAPIService } from '../services/chiamate-api.service';

interface CheapSharkDeal {
  gameID: string;
  dealID: string;
  title: string;
  thumb: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  metacriticScore?: string;
  storeID: string;
  steamAppID?: string;
  dealRating?: string;
}

interface RootGame {
  gameID: string;
  dealID: string;
  title: string;
  image: string;
  price: string;
  oldPrice: string;
  discount: string;
  store: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  wishlist = new Set<string>();
  query = '';
  errorMessage: string | null = null;
  loading = false;
  hasSearched = false;

  // La home non contiene giochi fissi: viene popolata dalla API ad ogni accesso.
  games: RootGame[] = [];

  private readonly storeNames: { [key: string]: string } = {
    '1': 'Steam',
    '2': 'GamersGate',
    '3': 'GreenManGaming',
    '7': 'GOG',
    '8': 'Origin',
    '11': 'Humble Store',
    '13': 'Uplay',
    '15': 'Fanatical',
    '25': 'Epic Games',
    '29': 'IndieGala',
    '30': 'Blizzard'
  };

  constructor(
    private chiamateApi: ChiamateAPIService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadHomeDeals();
  }

  private loadHomeDeals(): void {
    this.loading = true;
    this.errorMessage = null;
    this.hasSearched = false;

    this.chiamateApi.getDeals().subscribe({
      next: (results: CheapSharkDeal[]) => {
        console.log('Top giochi in offerta:', results);
        this.games = this.buildUniqueGames(results);
        this.loading = false;

        if (this.games.length === 0) {
          this.errorMessage = 'Non sono riuscito a trovare giochi popolari attualmente in offerta.';
        }
      },
      error: (error) => {
        console.error('Errore caricamento offerte home:', error);
        this.errorMessage = 'Impossibile caricare le offerte. Riprova più tardi.';
        this.loading = false;
      }
    });
  }

  search(): void {
    const searchQuery = this.query.trim();

    if (!searchQuery) {
      this.errorMessage = 'Inserisci il nome di un gioco.';
      return;
    }

    this.query = searchQuery;
    this.loading = true;
    this.hasSearched = true;
    this.errorMessage = null;
    this.games = [];

    console.log('Search:', searchQuery);

    this.chiamateApi.searchGame(searchQuery).subscribe({
      next: (results: CheapSharkDeal[]) => {
        console.log('Risultati CheapShark:', results);
        this.games = this.buildUniqueGames(results);
        this.loading = false;

        if (this.games.length === 0) {
          this.errorMessage = `Nessun gioco trovato per "${searchQuery}"`;
        }
      },
      error: (error) => {
        console.error('Errore durante la ricerca:', error);
        this.errorMessage = 'Errore durante la ricerca. Riprova più tardi.';
        this.loading = false;
      }
    });
  }

  private buildUniqueGames(results: CheapSharkDeal[]): RootGame[] {
    const uniqueGames = new Map<string, CheapSharkDeal>();

    for (const deal of results) {
      if (!deal.gameID) {
        continue;
      }

      const existing = uniqueGames.get(deal.gameID);
      const currentPrice = Number.parseFloat(deal.salePrice);
      const existingPrice = existing
        ? Number.parseFloat(existing.salePrice)
        : Number.POSITIVE_INFINITY;

      // Una card rappresenta un gioco. Se lo stesso gioco è presente su più store,
      // manteniamo l'offerta più economica senza alterare il ranking della API.
      if (!existing || currentPrice < existingPrice) {
        uniqueGames.set(deal.gameID, deal);
      }
    }

    // L'ordine viene dalla classifica CheapShark: prima popolarità, poi qualità.
    // Non ordiniamo più per percentuale di sconto, perché questo favorirebbe giochi
    // sconosciuti con sconti enormi rispetto ai titoli realmente popolari.
    return Array.from(uniqueGames.values())
      .slice(0, 12)
      .map(deal => this.toRootGame(deal));
  }

  private toRootGame(deal: CheapSharkDeal): RootGame {
    return {
      gameID: deal.gameID,
      dealID: deal.dealID,
      title: deal.title,
      image: deal.thumb,
      price: deal.salePrice,
      oldPrice: deal.normalPrice,
      discount: Math.round(Number.parseFloat(deal.savings || '0')) + '%',
      store: this.getStoreName(deal.storeID)
    };
  }

  getStoreName(storeID: string): string {
    return this.storeNames[storeID] || `Store #${storeID}`;
  }

  toggleWishlist(gameID: string): void {
    if (this.wishlist.has(gameID)) {
      this.wishlist.delete(gameID);
    } else {
      this.wishlist.add(gameID);
    }
  }

  isWishlisted(gameID: string): boolean {
    return this.wishlist.has(gameID);
  }

  goToDeal(dealID: string): void {
    window.open(
      `https://www.cheapshark.com/redirect?dealID=${dealID}`,
      '_blank'
    );
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/no-cover.png';
  }
}
