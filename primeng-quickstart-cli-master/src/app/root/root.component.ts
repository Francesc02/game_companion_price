import { Component } from '@angular/core';
import { ChiamateAPIService } from '../services/chiamate-api.service';
import { ActivatedRoute, Router } from '@angular/router';

interface RootGame {
  title: string;
  image: string;
  price: string;
  oldPrice: string;
  discount: string;
  store: string;
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
  query: string | undefined;
  errorMessage: string | null = null;
  loading: boolean = false;
   
  constructor(
      public chiamateApi: ChiamateAPIService,
      public route: ActivatedRoute,
      public router: Router
    ) {}

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

  search(): void {
    console.log('Search:', this.query.trim());

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
        console.log(this.errorMessage)
        this.loading = false;
      }
    });
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
}
