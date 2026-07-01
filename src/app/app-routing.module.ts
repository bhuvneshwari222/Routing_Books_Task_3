import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthorsDashboardComponent } from "./shared/components/authors-dashboard/authors-dashboard.component";
import { HomeDashboardComponent } from "./shared/components/home-dashboard/home-dashboard.component";
import { AuthorDetailsComponent } from "./shared/components/authors-dashboard/author-details/author-details.component";
import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";
import { AuthorFormComponent } from "./shared/components/authors-dashboard/author-form/author-form.component";
import { BooksDashboardComponent } from "./shared/components/books-dashboard/books-dashboard.component";
import { BookDetailsComponent } from "./shared/components/books-dashboard/book-details/book-details.component";
import { BookFormComponent } from "./shared/components/books-dashboard/book-form/book-form.component";
import { LibraryDashboardComponent } from "./shared/components/library-dashboard/library-dashboard.component";
import { LibraryDetailsComponent } from "./shared/components/library-dashboard/library-details/library-details.component";


const routes = [
    {
        path: '',
        component: HomeDashboardComponent
    },
    {
        path: 'home',
        component: HomeDashboardComponent
    },
    {
        path: 'authors',
        component: AuthorsDashboardComponent,
        children: [
            {
                path: 'addAuthor',
                component: AuthorFormComponent
            },
            {
                path: ':authorID',
                component: AuthorDetailsComponent
            },
            {
                path: ':authorID/edit',
                component: AuthorFormComponent
            }
        ]
    },
    {
        path: 'books',
        component: BooksDashboardComponent,
        children: [
            {
                path: 'addBook',
                component: BookFormComponent
            },
            {
                path: ':bookID',
                component: BookDetailsComponent
            },
            {
                path: ':bookID/edit',
                component: BookFormComponent
            }
        ]
    },
    {
        path: 'libraries',
        component: LibraryDashboardComponent,
        children: [
            {
                path: ':libraryID',
                component: LibraryDetailsComponent
            }
        ]
    },
    {
        path: 'page-not-found',
        component: PageNotFoundComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }