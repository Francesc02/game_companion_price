import { Component, OnInit } from '@angular/core';
import { ChiamateAPIService } from '../../services/chiamate-api.service';

interface Deal { gameID: string; dealID: string; title: string; thumb: string; salePrice: string; normalPrice: string; savings: string; storeID: string; }

@Component({
  selector: 'app-offerte',
  template: `
    <section class="page">
      <div class="heading"><span>GAME COMPANION PRICE</span><h1>Le migliori offerte</h1><p>Offerte reali aggiornate ad ogni accesso.</p></div>
      <p *ngIf="loading">Caricamento offerte...</p>
      <div class="grid" *ngIf="!loading">
        <article class="card" *ngFor="let deal of deals">
          <img [src]="deal.thumb" [alt]="deal.title">
          <div><h3>{{ deal.title }}</h3><small>{{ getStoreName(deal.storeID) }}</small><div class="price">€ {{ deal.salePrice }} <del>€ {{ deal.normalPrice }}</del></div><button (click)="openDeal(deal.dealID)">Vedi offerta</button></div>
        </article>
      </div>
    </section>
  `,
  styles: [`.page{max-width:1280px;margin:auto;padding:60px 24px;color:#eaf0f3}.heading span{color:#57e879;font-size:11px;font-weight:800;letter-spacing:1.5px}.heading h1{font-size:40px;margin:8px 0}.heading p{color:#84919a}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.card{overflow:hidden;background:#101820;border:1px solid rgba(255,255,255,.07);border-radius:12px}.card img{width:100%;aspect-ratio:460/215;object-fit:cover;display:block}.card>div{padding:15px}.card h3{font-size:14px;margin:0 0 6px}.card small{color:#73808a}.price{margin-top:14px;color:#57e879;font-size:19px;font-weight:800}.price del{color:#66727c;font-size:11px;margin-left:7px;font-weight:400}.card button{width:100%;margin-top:13px;padding:9px;border:0;border-radius:7px;background:rgba(87,232,121,.12);color:#57e879;font-weight:700;cursor:pointer}@media(max-width:800px){.grid{grid-template-columns:repeat(2,1fr)}}`]
})
export class OfferteComponent implements OnInit {
  deals: Deal[] = [];
  loading = true;
  private readonly stores: {[key:string]:string} = {'1':'Steam','2':'GamersGate','3':'GreenManGaming','7':'GOG','11':'Humble Store','15':'Fanatical','25':'Epic Games'};
  constructor(private api: ChiamateAPIService) {}
  ngOnInit(): void { this.api.getDeals().subscribe({next:r => { this.deals = r.slice(0,24); this.loading=false; }, error:()=>this.loading=false}); }
  getStoreName(id:string): string { return this.stores[id] || `Store #${id}`; }
  openDeal(id:string): void { window.open(`https://www.cheapshark.com/redirect?dealID=${id}`, '_blank'); }
}
