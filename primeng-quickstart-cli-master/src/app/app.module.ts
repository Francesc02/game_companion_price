import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/container/home-page.component';
import { AppRoutingModule } from './app.routing.module';
import { DettaglioComponent } from './dettaglio/dettaglio.component';
import { ContattiComponent } from './contatti/contatti.component';
import { GeneriComponent } from './generi/generi.component';
import { SharedModule } from './shared/shared.module';
import { RootComponent } from './root/root.component';

@NgModule({
  declarations: [
    RootComponent,
    HeaderComponent,
    HomePageComponent,
    DettaglioComponent,
    ContattiComponent,
    GeneriComponent
  ],
  imports: [
    SharedModule,
    MatCardModule,
    FormsModule,
    AppRoutingModule
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
