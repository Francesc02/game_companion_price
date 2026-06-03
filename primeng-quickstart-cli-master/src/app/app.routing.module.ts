import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/container/home-page.component';
import { AppComponent } from './app.component';
import { DettaglioComponent } from './dettaglio/dettaglio.component';
import { HeaderComponent } from './header/header.component';
import { ContattiComponent } from './contatti/contatti.component';
import { GeneriComponent } from './generi/generi.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'home/:query', component: HomePageComponent },
  { path: 'contatti', component:ContattiComponent},
  { path: 'generi/:query', component:GeneriComponent},
  { path: 'dettaglio/:id', component:DettaglioComponent},
  { path: '**', component:HomePageComponent},
  { path: '', component:HomePageComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
