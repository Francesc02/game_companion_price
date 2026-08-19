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
  selector: 'app-preview',
  template: `
    <div class="preview-app">
      <header class="topbar">
        <div class="topbar-inner">
          <a class="brand" href="#" (click)="$event.preventDefault()">
            <span class="brand-mark">🎮</span>
            <span>Game Companion <b>Price</b></span>
          </a>

          <nav class="nav-links">
            <a [class.active]="activeSection === 'home'" (click)="activeSection = 'home'">Home</a>
            <a [class.active]="activeSection === 'offers'" (click)="activeSection = 'offers'">Offerte</a>
            <a [class.active]="activeSection === 'wishlist'" (click)="activeSection = 'wishlist'">Wishlist</a>
            <a [class.active]="activeSection === 'about'" (click)="activeSection = 'about'">Chi siamo</a>
          </nav>

          <div class="account-actions">
            <button class="login-btn">Accedi</button>
            <button class="signup-btn">Registrati</button>
          </div>
        </div>
      </header>

      <main>
        <section class="hero">
          <div class="hero-overlay"></div>
          <div class="hero-content">
            <span class="eyebrow">GAME PRICE COMPANION</span>
            <h1>Trova il miglior prezzo<br><span>per i tuoi giochi.</span></h1>
            <p>Confronta le offerte, scopri nuovi giochi e tieni d'occhio i prezzi che ti interessano.</p>

            <div class="search-box">
              <span class="search-icon">⌕</span>
              <input [(ngModel)]="query" placeholder="Cerca un gioco..." (keyup.enter)="search()" />
              <button (click)="search()">Cerca</button>
            </div>

            <div class="hero-points">
              <div><span>✓</span><div><strong>Confronta prezzi</strong><small>Più store in un unico posto</small></div></div>
              <div><span>%</span><div><strong>Scopri le offerte</strong><small>Trova gli sconti migliori</small></div></div>
              <div><span>♡</span><div><strong>Salva i tuoi giochi</strong><small>Crea la tua wishlist</small></div></div>
            </div>
          </div>
        </section>

        <section class="content-section">
          <div class="section-heading">
            <div>
              <span class="section-kicker">IN EVIDENZA</span>
              <h2>Offerte che meritano attenzione</h2>
              <p>I giochi più interessanti del momento, senza perdere tempo a cercare.</p>
            </div>
            <button class="ghost-link" (click)="activeSection = 'offers'">Vedi tutte →</button>
          </div>

          <div class="game-grid">
            <article class="game-card" *ngFor="let game of games">
              <div class="cover-wrap">
                <img [src]="game.image" [alt]="game.title" />
                <span class="discount">-{{ game.discount }}</span>
                <button class="heart" (click)="toggleWishlist(game.title)">
                  {{ isWishlisted(game.title) ? '♥' : '♡' }}
                </button>
              </div>
              <div class="game-body">
                <div class="game-title-row">
                  <h3>{{ game.title }}</h3>
                  <span class="platform">PC</span>
                </div>
                <span class="store">{{ game.store }}</span>
                <div class="price-row">
                  <strong>€ {{ game.price }}</strong>
                  <del>€ {{ game.oldPrice }}</del>
                </div>
                <button class="deal-btn">Vedi offerta</button>
              </div>
            </article>
          </div>
        </section>

        <section class="comparison-section">
          <div class="section-heading compact">
            <div>
              <span class="section-kicker">COME FUNZIONA</span>
              <h2>Un confronto semplice, finalmente</h2>
            </div>
          </div>

          <div class="feature-grid">
            <div class="feature-card"><span>01</span><h3>Cerca</h3><p>Inserisci il gioco che stai cercando e lascia fare il lavoro a Game Companion.</p></div>
            <div class="feature-card"><span>02</span><h3>Confronta</h3><p>Mettiamo a confronto prezzi e sconti dei principali store digitali.</p></div>
            <div class="feature-card"><span>03</span><h3>Risparmia</h3><p>Apri l'offerta più conveniente e acquista direttamente dallo store.</p></div>
          </div>
        </section>

        <section class="results-preview">
          <div class="results-header">
            <div>
              <span class="section-kicker">ANTEPRIMA</span>
              <h2>Risultati di ricerca</h2>
              <p>Un esempio di come imposterei la pagina dei risultati.</p>
            </div>
            <span class="result-count">12 risultati</span>
          </div>

          <div class="results-layout">
            <aside class="filters">
              <strong>Filtri</strong>
              <label><input type="checkbox" checked /> PC</label>
              <label><input type="checkbox" /> PlayStation</label>
              <label><input type="checkbox" /> Xbox</label>
              <label><input type="checkbox" /> Nintendo Switch</label>
              <hr />
              <span>Prezzo massimo</span>
              <div class="fake-range"><i></i></div>
              <div class="range-labels"><small>€ 0</small><small>€ 100</small></div>
              <button class="sort-btn">Prezzo più basso⌄</button>
            </aside>

            <div class="result-list">
              <div class="result-row" *ngFor="let game of games.slice(0, 3)">
                <img [src]="game.image" [alt]="game.title" />
                <div class="result-info"><strong>{{ game.title }}</strong><span>{{ game.store }} · PC</span></div>
                <div class="result-price"><strong>€ {{ game.price }}</strong><del>€ {{ game.oldPrice }}</del></div>
                <span class="result-discount">-{{ game.discount }}</span>
                <button class="small-heart" (click)="toggleWishlist(game.title)">{{ isWishlisted(game.title) ? '♥' : '♡' }}</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="footer">
        <span>🎮 Game Companion Price</span>
        <span>Confronta. Risparmia. Gioca.</span>
      </footer>
    </div>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; }
    :host * { box-sizing: border-box; }
    .preview-app { min-height: 100vh; background: #080d12; color: #eaf0f3; font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .topbar { position: sticky; top: 0; z-index: 50; background: rgba(8,13,18,.9); backdrop-filter: blur(18px); border-bottom: 1px solid rgba(255,255,255,.07); }
    .topbar-inner { max-width: 1280px; height: 70px; margin: auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
    .brand { display: flex; align-items: center; gap: 10px; color: #f4f8fa; text-decoration: none; font-size: 17px; font-weight: 700; white-space: nowrap; }
    .brand b { color: #57e879; }
    .brand-mark { width: 35px; height: 35px; display: grid; place-items: center; border-radius: 10px; background: #57e879; font-size: 19px; }
    .nav-links { display: flex; align-items: center; gap: 30px; }
    .nav-links a { position: relative; padding: 25px 0; color: #8f9aa3; font-size: 13px; font-weight: 600; cursor: pointer; }
    .nav-links a.active, .nav-links a:hover { color: #57e879; }
    .nav-links a.active::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: #57e879; }
    .account-actions { display: flex; gap: 8px; }
    button { font: inherit; cursor: pointer; }
    .login-btn { border: 0; background: transparent; color: #dce4e8; padding: 10px 13px; }
    .signup-btn { border: 0; border-radius: 8px; padding: 10px 15px; background: #57e879; color: #061008; font-weight: 800; }
    .hero { position: relative; min-height: 520px; display: flex; align-items: center; overflow: hidden; background: radial-gradient(circle at 75% 45%, rgba(42,91,67,.38), transparent 35%), linear-gradient(110deg,#091016 15%,#0b151b 55%,#111d20); }
    .hero::before { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(8,13,18,.98) 0%, rgba(8,13,18,.88) 45%, rgba(8,13,18,.35) 100%); }
    .hero::after { content: ""; position: absolute; width: 520px; height: 520px; right: 5%; top: 10px; border-radius: 50%; background: radial-gradient(circle, rgba(87,232,121,.13), transparent 65%); filter: blur(8px); }
    .hero-overlay { position: absolute; inset: 0; opacity: .2; background-image: linear-gradient(135deg, transparent 0 48%, rgba(87,232,121,.18) 49%, transparent 50%); background-size: 46px 46px; }
    .hero-content { position: relative; z-index: 1; width: 100%; max-width: 1280px; margin: auto; padding: 82px 24px; }
    .eyebrow, .section-kicker { color: #57e879; font-size: 11px; font-weight: 900; letter-spacing: 1.7px; }
    .hero h1 { margin: 16px 0 14px; max-width: 690px; font-size: clamp(42px, 5.5vw, 68px); line-height: 1.02; letter-spacing: -2px; }
    .hero h1 span { color: #57e879; }
    .hero p { max-width: 570px; margin: 0; color: #aab5bd; font-size: 16px; line-height: 1.65; }
    .search-box { display: flex; align-items: center; max-width: 650px; height: 58px; margin-top: 30px; padding: 6px 7px 6px 17px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.13); border-radius: 11px; box-shadow: 0 15px 45px rgba(0,0,0,.22); }
    .search-icon { color: #7f8a93; font-size: 25px; transform: rotate(-20deg); }
    .search-box input { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; color: white; padding: 0 14px; font-size: 15px; }
    .search-box input::placeholder { color: #75818a; }
    .search-box button { height: 46px; padding: 0 24px; border: 0; border-radius: 8px; background: #57e879; color: #061008; font-weight: 800; }
    .hero-points { display: grid; grid-template-columns: repeat(3, 1fr); max-width: 760px; margin-top: 45px; gap: 18px; }
    .hero-points > div { display: flex; align-items: center; gap: 11px; }
    .hero-points > div > span { width: 36px; height: 36px; display: grid; place-items: center; border-radius: 50%; background: rgba(87,232,121,.1); color: #57e879; font-weight: 800; }
    .hero-points strong, .hero-points small { display: block; }
    .hero-points strong { font-size: 12px; }
    .hero-points small { margin-top: 3px; color: #77838c; font-size: 10px; }
    .content-section, .comparison-section, .results-preview { max-width: 1280px; margin: auto; padding: 70px 24px; }
    .section-heading, .results-header { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 28px; }
    .section-heading h2, .results-header h2 { margin: 7px 0 5px; color: #f3f7f8; font-size: 29px; letter-spacing: -.6px; }
    .section-heading p, .results-header p { margin: 0; color: #7f8b94; font-size: 13px; }
    .ghost-link { border: 0; background: transparent; color: #57e879; font-weight: 700; }
    .game-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
    .game-card { overflow: hidden; background: #101820; border: 1px solid rgba(255,255,255,.07); border-radius: 12px; transition: transform .2s,border-color .2s,box-shadow .2s; }
    .game-card:hover { transform: translateY(-5px); border-color: rgba(87,232,121,.4); box-shadow: 0 18px 40px rgba(0,0,0,.22); }
    .cover-wrap { position: relative; aspect-ratio: 16/9; overflow: hidden; background: #131d24; }
    .cover-wrap img { width: 100%; height: 100%; display: block; object-fit: cover; transition: transform .3s; }
    .game-card:hover .cover-wrap img { transform: scale(1.05); }
    .discount { position: absolute; left: 10px; top: 10px; padding: 5px 7px; border-radius: 5px; background: #57e879; color: #061008; font-size: 10px; font-weight: 900; }
    .heart { position: absolute; right: 9px; top: 9px; width: 34px; height: 34px; border: 1px solid rgba(255,255,255,.12); border-radius: 50%; background: rgba(0,0,0,.6); color: white; font-size: 17px; }
    .game-body { padding: 14px; }
    .game-title-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .game-title-row h3 { margin: 0; overflow: hidden; color: #f1f5f7; font-size: 14px; white-space: nowrap; text-overflow: ellipsis; }
    .platform { color: #65727c; font-size: 9px; font-weight: 800; }
    .store { display: block; margin-top: 5px; color: #74808a; font-size: 10px; }
    .price-row { display: flex; align-items: baseline; gap: 8px; margin-top: 14px; }
    .price-row strong { color: #57e879; font-size: 19px; }
    .price-row del { color: #5f6a73; font-size: 10px; }
    .deal-btn { width: 100%; margin-top: 13px; padding: 9px; border: 1px solid rgba(87,232,121,.18); border-radius: 7px; background: rgba(87,232,121,.08); color: #57e879; font-size: 11px; font-weight: 800; }
    .deal-btn:hover { background: #57e879; color: #061008; }
    .comparison-section { border-top: 1px solid rgba(255,255,255,.05); border-bottom: 1px solid rgba(255,255,255,.05); }
    .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .feature-card { padding: 25px; border: 1px solid rgba(255,255,255,.07); border-radius: 12px; background: linear-gradient(145deg,#101820,#0c1319); }
    .feature-card > span { color: #57e879; font-size: 11px; font-weight: 900; }
    .feature-card h3 { margin: 25px 0 7px; font-size: 19px; }
    .feature-card p { margin: 0; color: #7f8b94; font-size: 13px; line-height: 1.6; }
    .results-preview { padding-bottom: 85px; }
    .result-count { padding: 7px 10px; border-radius: 6px; background: #111c23; color: #7f8b94; font-size: 11px; }
    .results-layout { display: grid; grid-template-columns: 220px 1fr; gap: 18px; }
    .filters { padding: 19px; border: 1px solid rgba(255,255,255,.07); border-radius: 11px; background: #0e161d; }
    .filters strong { display: block; margin-bottom: 17px; font-size: 13px; text-transform: uppercase; }
    .filters label { display: block; margin: 13px 0; color: #8d99a2; font-size: 11px; }
    .filters input { accent-color: #57e879; margin-right: 8px; }
    .filters hr { border: 0; border-top: 1px solid rgba(255,255,255,.07); margin: 20px 0; }
    .filters > span { color: #7f8b94; font-size: 10px; }
    .fake-range { height: 4px; margin-top: 15px; border-radius: 99px; background: #26333b; }
    .fake-range i { display: block; width: 70%; height: 100%; border-radius: 99px; background: #57e879; }
    .range-labels { display: flex; justify-content: space-between; margin-top: 7px; color: #67737c; }
    .sort-btn { width: 100%; margin-top: 22px; padding: 9px; border: 1px solid rgba(255,255,255,.08); border-radius: 7px; background: #121c23; color: #b5bec4; text-align: left; font-size: 10px; }
    .result-list { display: flex; flex-direction: column; gap: 9px; }
    .result-row { display: grid; grid-template-columns: 80px 1fr auto auto 32px; align-items: center; gap: 15px; min-height: 80px; padding: 8px 12px 8px 8px; border: 1px solid rgba(255,255,255,.06); border-radius: 10px; background: #0f171e; }
    .result-row img { width: 80px; height: 56px; object-fit: cover; border-radius: 6px; }
    .result-info strong, .result-info span { display: block; }
    .result-info strong { font-size: 13px; }
    .result-info span { margin-top: 5px; color: #6e7a83; font-size: 10px; }
    .result-price { text-align: right; }
    .result-price strong { display: block; color: #57e879; font-size: 15px; }
    .result-price del { color: #5e6a73; font-size: 9px; }
    .result-discount { padding: 5px 6px; border-radius: 5px; background: rgba(87,232,121,.12); color: #57e879; font-size: 9px; font-weight: 900; }
    .small-heart { border: 0; background: transparent; color: #8b969e; font-size: 17px; }
    .footer { display: flex; justify-content: space-between; max-width: 1280px; margin: auto; padding: 25px 24px 35px; border-top: 1px solid rgba(255,255,255,.06); color: #68747d; font-size: 11px; }
    @media (max-width: 900px) { .nav-links { display: none; } .game-grid { grid-template-columns: repeat(2,1fr); } .hero-points { grid-template-columns: 1fr; gap: 12px; } .results-layout { grid-template-columns: 1fr; } .filters { display: none; } }
    @media (max-width: 600px) { .topbar-inner { padding: 0 16px; } .account-actions { display: none; } .brand { font-size: 15px; } .hero { min-height: 580px; } .hero-content { padding: 65px 18px; } .hero h1 { font-size: 42px; letter-spacing: -1.5px; } .content-section, .comparison-section, .results-preview { padding: 48px 16px; } .section-heading { align-items: flex-start; } .section-heading h2, .results-header h2 { font-size: 25px; } .game-grid { gap: 10px; } .game-body { padding: 10px; } .price-row strong { font-size: 16px; } .feature-grid { grid-template-columns: 1fr; } .result-row { grid-template-columns: 64px 1fr auto; gap: 10px; } .result-row img { width: 64px; height: 46px; } .result-discount, .small-heart { display: none; } .search-box button { padding: 0 15px; } .footer { padding-left: 16px; padding-right: 16px; } }
  `]
})
export class PreviewComponent {
  query = '';
  activeSection = 'home';
  wishlist = new Set<string>();

  games: PreviewGame[] = [
    { title: 'Elden Ring', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg', price: '29,99', oldPrice: '59,99', discount: '50%', store: 'Steam' },
    { title: "Baldur's Gate 3", image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg', price: '39,99', oldPrice: '59,99', discount: '33%', store: 'Steam' },
    { title: 'Hogwarts Legacy', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg', price: '24,99', oldPrice: '59,99', discount: '58%', store: 'Epic Games' },
    { title: 'Cyberpunk 2077', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg', price: '19,99', oldPrice: '59,99', discount: '67%', store: 'GOG' }
  ];

  search(): void {
    if (this.query.trim()) {
      this.activeSection = 'offers';
    }
  }

  toggleWishlist(title: string): void {
    this.wishlist.has(title) ? this.wishlist.delete(title) : this.wishlist.add(title);
  }

  isWishlisted(title: string): boolean {
    return this.wishlist.has(title);
  }
}
