import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/container/home-page.component';
import { AppRoutingModule } from './app.routing.module';
import { DettaglioComponent } from './dettaglio/dettaglio.component';
import { ContattiComponent } from './contatti/contatti.component';
import { GeneriComponent } from './generi/generi.component';
import { SharedModule } from './shared/shared.module';
import { RootComponent } from './root/root.component';
import { OfferteComponent } from './pages/offerte/offerte.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { AuthComponent } from './pages/auth/auth.component';

@NgModule({
  declarations: [RootComponent, HeaderComponent, HomePageComponent, DettaglioComponent, ContattiComponent, GeneriComponent, OfferteComponent, WishlistComponent, AuthComponent],
  imports: [SharedModule, MatCardModule, FormsModule, HttpClientModule, AppRoutingModule],
  bootstrap: [RootComponent]
})
export class AppModule {}
