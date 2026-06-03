import { HttpClientModule } from "@angular/common/http";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MenubarModule } from "primeng/menubar";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { ProductService } from "../services/product.service";
import { MatCardModule } from "@angular/material/card";
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    DialogModule,
    ToolbarModule,
    ConfirmDialogModule,
    RatingModule,
    InputNumberModule,
    InputTextareaModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    MenubarModule,
    RouterModule,
    CardModule,
    DividerModule,
    MatCardModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    DialogModule,
    ToolbarModule,
    ConfirmDialogModule,
    RatingModule,
    InputNumberModule,
    InputTextareaModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    MenubarModule,
    RouterModule,
    CardModule,
    DividerModule,
  ],
  providers: [
    ConfirmationService,
    ConfirmationService,
    MessageService,
    ProductService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
