import { Component } from '@angular/core';

interface PreviewGame {
  title: string;
  image: string;
  price: string;
  oldPrice: string;
  discount: string;
  store: string;
}

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <header class="navbar">
        <a class="brand" href="#" (click)="$event.preventDefault()">
          <span class="brand-icon">🎮</span>
          <span>Game Companion <b>Price</b></span>
        </a>
        <nav>
          <a class="active">Home</a>
          <a>Offerte</a>
          <a>Wishlist</a>
          <a>Chi siamo</a>
        </nav>
        <div class="actions"><button>Accedi</button><button class="signup">Registrati</button></div>
      </header>

      <main>
        <section class="hero">
          <div class="hero-content">
            <span class="eyebrow">GAME PRICE COMPANION</span>
            <h1>Trova il miglior prezzo<br><span>per i tuoi giochi.</span></h1>
            <p>Confronta le offerte, scopri nuovi giochi e trova il prezzo migliore in pochi secondi.</p>
            <div class="search">
              <span>⌕</span>
              <input [(ngModel)]="query" placeholder="Cerca un gioco..." (keyup.enter)="search()" />
              <button (click)="search()">Cerca</button>
            </div>
            <div class="points">
              <div><b>✓</b><span><strong>Confronta prezzi</strong><small>Più store in un unico posto</small></span></div>
              <div><b>%</b><span><strong>Scopri le offerte</strong><small>Trova gli sconti migliori</small></span></div>
              <div><b>♡</b><span><strong>Salva i tuoi giochi</strong><small>Crea la tua wishlist</small></span></div>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-head">
            <div><span class="kicker">IN EVIDENZA</span><h2>Offerte che meritano attenzione</h2><p>I giochi più interessanti del momento.</p></div>
            <button class="link-btn">Vedi tutte →</button>
          </div>

          <div class="grid">
            <article class="card" *ngFor="let game of games">
              <div class="cover"><img [src]="game.image" [alt]="game.title" /><span class="discount">-{{ game.discount }}</span><button class="heart" (click)="toggleWishlist(game.title)">{{ isWishlisted(game.title) ? '♥' : '♡' }}</button></div>
              <div class="body"><h3>{{ game.title }}</h3><span class="store">{{ game.store }} · PC</span><div class="price"><strong>€ {{ game.price }}</strong><del>€ {{ game.oldPrice }}</del></div><button class="deal">Vedi offerta</button></div>
            </article>
          </div>
        </section>

        <section class="section how">
          <div class="section-head"><div><span class="kicker">COME FUNZIONA</span><h2>Un confronto semplice</h2></div></div>
          <div class="features"><div><span>01</span><h3>Cerca</h3><p>Inserisci il gioco che stai cercando.</p></div><div><span>02</span><h3>Confronta</h3><p>Mettiamo a confronto prezzi e sconti.</p></div><div><span>03</span><h3>Risparmia</h3><p>Scegli l'offerta più conveniente.</p></div></div>
        </section>
      </main>

      <footer><span>🎮 Game Companion Price</span><span>Confronta. Risparmia. Gioca.</span></footer>
    </div>
  `,
  styles: [`
    :host{display:block;min-height:100vh}.app{min-height:100vh;background:#080d12;color:#eaf0f3;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.navbar{position:sticky;top:0;z-index:20;height:70px;padding:0 24px;display:flex;align-items:center;justify-content:space-between;gap:25px;background:rgba(8,13,18,.92);backdrop-filter:blur(18px);border-bottom:1px solid rgba(255,255,255,.07)}.brand{display:flex;align-items:center;gap:10px;color:#f4f8fa;text-decoration:none;font-size:17px;font-weight:700;white-space:nowrap}.brand b{color:#57e879}.brand-icon{width:35px;height:35px;display:grid;place-items:center;border-radius:10px;background:#57e879;font-size:18px}nav{display:flex;gap:30px}nav a{color:#8f9aa3;font-size:13px;font-weight:600}nav a.active{color:#57e879}.actions{display:flex;gap:8px}.actions button,.search button,.deal{border:0;cursor:pointer}.actions button{padding:10px 13px;background:transparent;color:#dce4e8}.actions .signup{border-radius:8px;background:#57e879;color:#061008;font-weight:800}.hero{min-height:520px;display:flex;align-items:center;background:radial-gradient(circle at 75% 45%,rgba(42,91,67,.4),transparent 35%),linear-gradient(110deg,#091016,#0b151b 55%,#111d20)}.hero-content{width:100%;max-width:1280px;margin:auto;padding:80px 24px}.eyebrow,.kicker{color:#57e879;font-size:11px;font-weight:900;letter-spacing:1.7px}.hero h1{margin:16px 0 14px;max-width:690px;font-size:clamp(42px,5.5vw,68px);line-height:1.02;letter-spacing:-2px}.hero h1 span{color:#57e879}.hero p{max-width:570px;margin:0;color:#aab5bd;font-size:16px;line-height:1.65}.search{display:flex;align-items:center;max-width:650px;height:58px;margin-top:30px;padding:6px 7px 6px 17px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.13);border-radius:11px}.search>span{color:#7f8a93;font-size:25px}.search input{flex:1;min-width:0;border:0;outline:0;background:transparent;color:#fff;padding:0 14px;font-size:15px}.search button{height:46px;padding:0 24px;border-radius:8px;background:#57e879;color:#061008;font-weight:800}.points{display:grid;grid-template-columns:repeat(3,1fr);max-width:760px;margin-top:45px;gap:18px}.points>div{display:flex;align-items:center;gap:11px}.points>div>b{width:36px;height:36px;display:grid;place-items:center;border-radius:50%;background:rgba(87,232,121,.1);color:#57e879}.points strong,.points small{display:block}.points strong{font-size:12px}.points small{margin-top:3px;color:#77838c;font-size:10px}.section{max-width:1280px;margin:auto;padding:70px 24px}.section-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:28px}.section-head h2{margin:7px 0 5px;font-size:29px;letter-spacing:-.6px}.section-head p{margin:0;color:#7f8b94;font-size:13px}.link-btn{border:0;background:transparent;color:#57e879;font-weight:700;cursor:pointer}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.card{overflow:hidden;background:#101820;border:1px solid rgba(255,255,255,.07);border-radius:12px;transition:.2s}.card:hover{transform:translateY(-5px);border-color:rgba(87,232,121,.4)}.cover{position:relative;aspect-ratio:16/9;overflow:hidden;background:#131d24}.cover img{width:100%;height:100%;display:block;object-fit:cover}.discount{position:absolute;left:10px;top:10px;padding:5px 7px;border-radius:5px;background:#57e879;color:#061008;font-size:10px;font-weight:900}.heart{position:absolute;right:9px;top:9px;width:34px;height:34px;border:1px solid rgba(255,255,255,.12);border-radius:50%;background:rgba(0,0,0,.6);color:#fff;font-size:17px;cursor:pointer}.body{padding:14px}.body h3{margin:0;overflow:hidden;color:#f1f5f7;font-size:14px;white-space:nowrap;text-overflow:ellipsis}.store{display:block;margin-top:6px;color:#65727c;font-size:11px}.price{display:flex;align-items:baseline;gap:8px;margin-top:14px}.price strong{color:#57e879;font-size:19px}.price del{color:#66727c;font-size:11px}.deal{width:100%;margin-top:13px;padding:9px;border-radius:7px;background:rgba(87,232,121,.11);color:#57e879;font-weight:700}.how{border-top:1px solid rgba(255,255,255,.05)}.features{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.features>div{padding:24px;background:#0e161d;border:1px solid rgba(255,255,255,.06);border-radius:12px}.features span{color:#57e879;font-size:12px;font-weight:900}.features h3{margin:18px 0 7px}.features p{margin:0;color:#7f8b94;font-size:13px;line-height:1.5}footer{display:flex;justify-content:space-between;padding:25px 24px;border-top:1px solid rgba(255,255,255,.06);color:#65727c;font-size:12px} @media(max-width:800px){nav,.actions{display:none}.navbar{height:62px}.hero-content{padding:55px 18px}.hero h1{font-size:42px}.points,.features{grid-template-columns:1fr}.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.section{padding:48px 16px}.section-head{align-items:flex-start;flex-direction:column}footer{flex-direction:column;gap:8px}}
  `]
})
export class PreviewComponent {
  query = '';
  wishlist = new Set<string>();

  games: PreviewGame[] = [
    { title: 'Elden Ring', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg', price: '29,99', oldPrice: '59,99', discount: '50%', store: 'Steam' },
    { title: "Baldur's Gate 3", image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg', price: '39,99', oldPrice: '59,99', discount: '33%', store: 'Steam' },
    { title: 'Hogwarts Legacy', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg', price: '24,99', oldPrice: '59,99', discount: '58%', store: 'Epic Games' },
    { title: 'Cyberpunk 2077', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg', price: '19,99', oldPrice: '59,99', discount: '67%', store: 'GOG' }
  ];

  search(): void {
    console.log('Preview search:', this.query);
  }

  toggleWishlist(title: string): void {
    this.wishlist.has(title) ? this.wishlist.delete(title) : this.wishlist.add(title);
  }

  isWishlisted(title: string): boolean {
    return this.wishlist.has(title);
  }
}
