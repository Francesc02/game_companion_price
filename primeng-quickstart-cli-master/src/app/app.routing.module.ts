import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/container/home-page.component';
import { DettaglioComponent } from './dettaglio/dettaglio.component';
import { ContattiComponent } from './contatti/contatti.component';
import { GeneriComponent } from './generi/generi.component';
import { OfferteComponent } from './pages/offerte/offerte.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { AuthComponent } from './pages/auth/auth.component';

const routes: Routes = [
  { path: 'offerte', component: OfferteComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'login', component: AuthComponent, data: { register: false } },
  { path: 'registrati', component: AuthComponent, data: { register: true } },

  { path: 'contatti', component: ContattiComponent },
  { path: 'generi/:query', component: GeneriComponent },
  { path: 'dettaglio/:id', component: DettaglioComponent },

  { path: 'home', pathMatch: 'full', redirectTo: '' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
