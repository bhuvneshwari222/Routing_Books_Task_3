import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Ibook } from "../models/books";
import { Observable } from "rxjs";
import { BooksService } from "./books.service";

@Injectable({
    providedIn: 'root'
})
export class BooksResolver implements Resolve<Ibook | Ibook[]> {
    private _bookService = inject(BooksService)
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Ibook | Ibook[] | Observable<Ibook | Ibook[]> | Promise<Ibook | Ibook[]> {
        let bookId = route.paramMap.get('bookID');
        if (bookId) {
            return this._bookService.fetchBookById(bookId);
        } else {
            return this._bookService.fetchBooksArr();
        }
    }
}