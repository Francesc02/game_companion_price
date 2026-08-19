import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/container/home-page.component';
import { DettaglioComponent } from './dettaglio/dettaglio.component';
import { ContattiComponent } from './contatti/contatti.component';
import { GeneriComponent } from './generi/generi.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'home/:query', component: HomePageComponent },
  { path: 'contatti', component: ContattiComponent },
  { path: 'generi/:query', component: GeneriComponent },
  { path: 'dettaglio/:id', component: DettaglioComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
