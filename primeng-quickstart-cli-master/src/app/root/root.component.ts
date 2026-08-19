import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ChiamateAPIService } from '../services/chiamate-api.service';
import { GameSearchService } from '../services/game-search.service';

interface CheapSharkDeal { gameID:string; dealID:string; title:string; thumb:string; salePrice:string; normalPrice:string; savings:string; metacriticScore?:string; storeID:string; steamAppID?:string; dealRating?:string; }
interface RootGame { gameID:string; dealID:string; title:string; image:string; price:string; oldPrice:string; discount:string; store:string; }

@Component({ selector:'app-root', templateUrl:'./root.component.html', styleUrls:['./root.component.css'] })
export class RootComponent implements OnInit {
  wishlist = new Set<string>(); query=''; errorMessage:string|null=null; loading=false; hasSearched=false; games:RootGame[]=[];
  private currentUrl='/';
  private readonly storeNames:{[key:string]:string}={'1':'Steam','2':'GamersGate','3':'GreenManGaming','7':'GOG','8':'Origin','11':'Humble Store','13':'Uplay','15':'Fanatical','25':'Epic Games','29':'IndieGala','30':'Blizzard'};

  constructor(private chiamateApi:ChiamateAPIService,private gameSearch:GameSearchService,public route:ActivatedRoute,public router:Router) {}

  ngOnInit():void {
    this.currentUrl=this.router.url;
    this.router.events.pipe(filter(event=>event instanceof NavigationEnd)).subscribe((event:any)=>this.currentUrl=event.urlAfterRedirects);
    this.loadHomeDeals();
  }

  isHomeRoute():boolean { return this.currentUrl==='/' || this.currentUrl==='/home'; }

  private loadHomeDeals():void {
    this.loading=true; this.errorMessage=null; this.hasSearched=false;
    this.chiamateApi.getDeals().subscribe({
      next:(results:CheapSharkDeal[])=>{this.games=this.buildUniqueGames(results);this.loading=false;if(this.games.length===0)this.errorMessage='Non sono riuscito a trovare giochi popolari attualmente in offerta.';},
      error:(error)=>{console.error('Errore caricamento offerte home:',error);this.errorMessage='Impossibile caricare le offerte. Riprova più tardi.';this.loading=false;}
    });
  }

  search():void {
    const searchQuery=this.query.trim();
    if(!searchQuery){this.errorMessage='Inserisci il nome di un gioco.';return;}
    this.query=searchQuery;this.loading=true;this.hasSearched=true;this.errorMessage=null;this.games=[];
    console.log('Search:',searchQuery);
    this.gameSearch.search(searchQuery).subscribe({
      next:(results:CheapSharkDeal[])=>{console.log('Risultati ricerca giochi:',results);this.games=this.buildUniqueGames(results);this.loading=false;if(this.games.length===0)this.errorMessage=`Nessun gioco trovato per "${searchQuery}"`;},
      error:(error)=>{console.error('Errore durante la ricerca:',error);this.errorMessage='Errore durante la ricerca. Riprova più tardi.';this.loading=false;}
    });
  }

  private buildUniqueGames(results:CheapSharkDeal[]):RootGame[]{
    const uniqueGames=new Map<string,CheapSharkDeal>();
    for(const deal of results){if(!deal.gameID)continue;const existing=uniqueGames.get(deal.gameID);const currentPrice=Number.parseFloat(deal.salePrice);const existingPrice=existing?Number.parseFloat(existing.salePrice):Number.POSITIVE_INFINITY;if(!existing||currentPrice<existingPrice)uniqueGames.set(deal.gameID,deal);}
    return Array.from(uniqueGames.values()).slice(0,12).map(deal=>this.toRootGame(deal));
  }

  private toRootGame(deal:CheapSharkDeal):RootGame{return{gameID:deal.gameID,dealID:deal.dealID,title:deal.title,image:deal.thumb,price:deal.salePrice,oldPrice:deal.normalPrice,discount:Math.round(Number.parseFloat(deal.savings||'0'))+'%',store:this.getStoreName(deal.storeID)};}
  getStoreName(storeID:string):string{return this.storeNames[storeID]||`Store #${storeID}`;}

  toggleWishlist(gameID:string):void{
    if(this.wishlist.has(gameID)){this.wishlist.delete(gameID);}else{this.wishlist.add(gameID);}
    const selected=this.games.find(game=>game.gameID===gameID);
    if(selected){let saved:RootGame[]=[];try{saved=JSON.parse(localStorage.getItem('game-companion-wishlist')||'[]');}catch{saved=[];}saved=saved.filter(game=>game.gameID!==gameID);if(this.wishlist.has(gameID))saved.push(selected);localStorage.setItem('game-companion-wishlist',JSON.stringify(saved));}
  }

  isWishlisted(gameID:string):boolean{return this.wishlist.has(gameID);}
  goToDeal(dealID:string):void{window.open(`https://www.cheapshark.com/redirect?dealID=${dealID}`,'_blank');}
  goToOffers():void{this.router.navigate(['/offerte']);}
  goToLogin():void{this.router.navigate(['/login']);}
  goToRegister():void{this.router.navigate(['/registrati']);}
  onImageError(event:Event):void{(event.target as HTMLImageElement).src='assets/images/no-cover.png';}
}
