import { Component, OnInit } from '@angular/core';

interface WishlistGame { gameID:string; title:string; image:string; price:string; oldPrice:string; discount:string; store:string; dealID:string; }

@Component({
  selector:'app-wishlist',
  template:`<section class="page"><div class="heading"><span>GAME COMPANION PRICE</span><h1>La tua wishlist</h1><p>I giochi che hai salvato dalla home.</p></div><div class="empty" *ngIf="games.length===0"><h2>Nessun gioco salvato</h2><p>Premi il cuore su una card per aggiungere un gioco.</p></div><div class="grid" *ngIf="games.length"><article class="card" *ngFor="let game of games"><img [src]="game.image" [alt]="game.title"><div><h3>{{game.title}}</h3><small>{{game.store}}</small><div class="price">€ {{game.price}} <del>€ {{game.oldPrice}}</del></div><button (click)="remove(game.gameID)">Rimuovi</button></div></article></div></section>`,
  styles:[`.page{max-width:1280px;margin:auto;padding:60px 24px;color:#eaf0f3}.heading span{color:#57e879;font-size:11px;font-weight:800;letter-spacing:1.5px}.heading h1{font-size:40px;margin:8px 0}.heading p,.empty p{color:#84919a}.empty{padding:40px;background:#101820;border:1px solid rgba(255,255,255,.07);border-radius:12px}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.card{overflow:hidden;background:#101820;border:1px solid rgba(255,255,255,.07);border-radius:12px}.card img{width:100%;aspect-ratio:460/215;object-fit:cover;display:block}.card>div{padding:15px}.card h3{font-size:14px;margin:0 0 6px}.card small{color:#73808a}.price{margin-top:14px;color:#57e879;font-size:19px;font-weight:800}.price del{color:#66727c;font-size:11px;margin-left:7px;font-weight:400}.card button{width:100%;margin-top:13px;padding:9px;border:0;border-radius:7px;background:rgba(255,255,255,.08);color:#dfe7eb;cursor:pointer}@media(max-width:800px){.grid{grid-template-columns:repeat(2,1fr)}}`]
})
export class WishlistComponent implements OnInit {
  games:WishlistGame[]=[];
  ngOnInit():void{this.load();}
  private load():void{try{this.games=JSON.parse(localStorage.getItem('game-companion-wishlist')||'[]');}catch{this.games=[];}}
  remove(id:string):void{this.games=this.games.filter(g=>g.gameID!==id);localStorage.setItem('game-companion-wishlist',JSON.stringify(this.games));}
}
