import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChiamateAPIService } from '../services/chiamate-api.service';

interface RootGame {
  title: string;
  image: string;
  price: string;
  oldPrice: string;
  discount: string;
  store: string;
  gameID?: string;
  dealID?: string;
  storeID?: string;
}

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
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent {
  wishlist = new Set<string>();
  query = '';
  errorMessage: string | null = null;
  loading = false;

  games: RootGame[] = [
    {
      title: 'Elden Ring',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
      price: '29,99',
      oldPrice: '59,99',
      discount: '50%',
      store: 'Steam'
    },
    {
      title: "Baldur's Gate 3",
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg',
      price: '39,99',
      oldPrice: '59,99',
      discount: '33%',
      store: 'Steam'
    },
    {
      title: 'Hogwarts Legacy',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg',
      price: '24,99',
      oldPrice: '59,99',
      discount: '58%',
      store: 'Epic Games'
    },
    {
      title: 'Cyberpunk 2077',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
      price: '19,99',
      oldPrice: '59,99',
      discount: '67%',
      store: 'GOG'
    }
  ];

  private storeNames: { [key: string]: string } = {
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

  search(): void {
    const searchQuery = this.query.trim();

    if (!searchQuery) {
      this.errorMessage = 'Inserisci il nome di un gioco.';
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    console.log('Search:', searchQuery);

    this.chiamateApi.searchGame(searchQuery).subscribe({
      next: (results: GameDeal[]) => {
        console.log('Risultati CheapShark:', results);

        this.games = results.map((game: GameDeal): RootGame => ({
          title: game.title,
          image: game.thumb,
          price: game.salePrice,
          oldPrice: game.normalPrice,
          discount: Math.round(Number(game.savings)) + '%',
          store: this.getStoreName(game.storeID),
          gameID: game.gameID,
          dealID: game.dealID,
          storeID: game.storeID
        }));

        if (this.games.length === 0) {
          this.errorMessage = `Nessun gioco trovato per "${searchQuery}"`;
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('Errore durante la ricerca:', error);
        this.errorMessage = 'Errore durante la ricerca. Riprova più tardi.';
        this.loading = false;
      }
    });
  }

  getStoreName(storeID: string): string {
    return this.storeNames[storeID] || `Store #${storeID}`;
  }

  toggleWishlist(title: string): void {
    if (this.wishlist.has(title)) {
      this.wishlist.delete(title);
    } else {
      this.wishlist.add(title);
    }
  }

  isWishlisted(title: string): boolean {
    return this.wishlist.has(title);
  }

  goToDeal(dealID: string | undefined): void {
    if (!dealID) {
      return;
    }

    window.open(
      `https://www.cheapshark.com/redirect?dealID=${dealID}`,
      '_blank'
    );
  }
}
