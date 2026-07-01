import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooksDashboardComponent } from './shared/components/books-dashboard/books-dashboard.component';
import { AuthorsDashboardComponent } from './shared/components/authors-dashboard/authors-dashboard.component';
import { HomeDashboardComponent } from './shared/components/home-dashboard/home-dashboard.component';
import { LibraryDashboardComponent } from './shared/components/library-dashboard/library-dashboard.component';
import { BookDetailsComponent } from './shared/components/books-dashboard/book-details/book-details.component';
import { BookFormComponent } from './shared/components/books-dashboard/book-form/book-form.component';
import { AuthorDetailsComponent } from './shared/components/authors-dashboard/author-details/author-details.component';
import { AuthorFormComponent } from './shared/components/authors-dashboard/author-form/author-form.component';
import { LibraryDetailsComponent } from './shared/components/library-dashboard/library-details/library-details.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GetConfirmComponent } from './shared/components/get-confirm/get-confirm.component';
import { LibararyCardsComponent } from './shared/components/library-dashboard/libarary-cards/libarary-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksDashboardComponent,
    AuthorsDashboardComponent,
    HomeDashboardComponent,
    LibraryDashboardComponent,
    BookDetailsComponent,
    BookFormComponent,
    AuthorDetailsComponent,
    AuthorFormComponent,
    LibraryDetailsComponent,
    NavbarComponent,
    PageNotFoundComponent,
    GetConfirmComponent,
    LibararyCardsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
