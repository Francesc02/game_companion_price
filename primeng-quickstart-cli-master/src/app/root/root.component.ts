import { Component } from '@angular/core';

interface RootGame {
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
export class RootComponent {
  query = '';
  wishlist = new Set<string>();

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
