import { Component, OnInit } from '@angular/core';
import { Ibook } from '../../models/books';
import { BooksService } from '../../services/books.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books-dashboard',
  templateUrl: './books-dashboard.component.html',
  styleUrls: ['./books-dashboard.component.scss']
})
export class BooksDashboardComponent implements OnInit {
  booksArr: Ibook[] = [];

  constructor(
    private _booksService: BooksService,
    private _snackbar: SnackbarService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.booksArr = this._route.snapshot.data['books'];
    this.setFirstBook();
  }

  ngOnInit(): void {
    // this.getBooksArr();
    this._booksService.setFirstBookSub$
      .subscribe(resp => {
        if (resp) {
          this.setFirstBook();
        }
      })
  }

  getBooksArr() {
    this._booksService.fetchBooksArr()
      .subscribe({
        next: resp => {
          this.booksArr = resp;
          this.setFirstBook();
        },
        error: err => {
          this._snackbar.openSnackBar(err.msg);
        }
      })
  }

  setFirstBook() {
    this._router.navigate(['books', this.booksArr[0].bookId], {
      queryParams: {
        bookStatus: this.booksArr[0].bookStatus
      }
    })
  }

}
