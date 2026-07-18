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
import { AuthComponent } from "./shared/components/auth/auth.component";
import { AuthorsResolver } from "./shared/services/authors.resolver";
import { BooksResolver } from "./shared/services/books.resolver";
import { LibraryResolver } from "./shared/services/library.resolver";
import { AuthGuard } from "./shared/services/auth.guard";
import { UserRoleGuard } from "./shared/services/userRole.guard";
import { CanDeactivateGuard } from "./shared/services/canDeactivate.guard";


const routes = [
    {
        path: '',
        component: AuthComponent
    },
    {
        path: 'home',
        component: HomeDashboardComponent,
        canActivate: [AuthGuard, UserRoleGuard],
        title: 'Home',
        data: {
            userRoles: ['admin', 'superAdmin', 'buyer']
        }
    },
    {
        path: 'authors',
        component: AuthorsDashboardComponent,
        canActivate: [AuthGuard, UserRoleGuard],
        title: 'Authors',
        data: {
            userRoles: ['admin', 'superAdmin']
        },
        resolve: {
            authors: AuthorsResolver
        },
        children: [
            {
                path: 'addAuthor',
                component: AuthorFormComponent
            },
            {
                path: ':authorID',
                component: AuthorDetailsComponent,
                resolve: {
                    author: AuthorsResolver
                },
            },
            {
                path: ':authorID/edit',
                component: AuthorFormComponent,
                canDeactivate: [CanDeactivateGuard]
            }
        ]
    },
    {
        path: 'books',
        component: BooksDashboardComponent,
        canActivate: [AuthGuard, UserRoleGuard],
        title: 'Books',
        data: {
            userRoles: ['admin', 'superAdmin', 'buyer']
        },
        resolve: {
            books: BooksResolver
        },
        children: [
            {
                path: 'addBook',
                component: BookFormComponent
            },
            {
                path: ':bookID',
                component: BookDetailsComponent,
                resolve: {
                    book: BooksResolver
                }
            },
            {
                path: ':bookID/edit',
                component: BookFormComponent,
                canDeactivate: [CanDeactivateGuard]
            }
        ]
    },
    {
        path: 'libraries',
        component: LibraryDashboardComponent,
        canActivate: [AuthGuard, UserRoleGuard],
        title: 'Libraries',
        data: {
            userRoles: ['superAdmin']
        },
        resolve: {
            libraries: LibraryResolver
        },
        children: [
            {
                path: ':libraryID',
                component: LibraryDetailsComponent,
                resolve: {
                    library: LibraryResolver
                }
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