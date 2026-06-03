import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';
import { ProductService } from './services/product.service';
import { HomePageComponent } from './home-page/container/home-page.component';
import { AppRoutingModule } from './app.routing.module';
import { DividerModule } from 'primeng/divider';
import { SharedModule } from './shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { DettaglioComponent } from './dettaglio/dettaglio.component';
import { ContattiComponent } from './contatti/contatti.component';
import { GeneriComponent } from './generi/generi.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomePageComponent,DettaglioComponent,ContattiComponent,GeneriComponent],
  imports: [SharedModule, MatCardModule, FormsModule, AppRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ConfirmationService,
    ConfirmationService,
    MessageService,
    ProductService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
