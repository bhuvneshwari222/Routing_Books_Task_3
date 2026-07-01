import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Ibook } from 'src/app/shared/models/books';
import { BooksService } from 'src/app/shared/services/books.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  bookObj !: Ibook;
  bookId !: string;

  constructor(
    private _bookService: BooksService,
    private _routes: ActivatedRoute,
    private _snackBar: SnackbarService,
    private _router: Router,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getBookObj();
  }

  getBookObj() {
    this._routes.params.subscribe(params => {
      this.bookId = params['bookID'];
      this._bookService.fetchBookById(this.bookId)
        .subscribe({
          next: resp => {
            this.bookObj = resp
          },
          error: err => {
            this._snackBar.openSnackBar(err.msg);
          }
        })
    })
  }

  onRemove() {
    let config = new MatDialogConfig();
    config.data = `Are you sure you want to remove this book with id ${this.bookId}`;
    config.width = '400px';
    config.disableClose = true;
    let matDialogRef = this._matDialog.open(GetConfirmComponent, config);
    matDialogRef.afterClosed()
      .subscribe({
        next: resp => {
          if (resp) {
            this._bookService.removeBook(this.bookId)
              .subscribe({
                next: resp => {
                  this._snackBar.openSnackBar(resp.msg);
                  this._router.navigate(['books']);
                  this._bookService.setFirstBookSub$.next(true);
                },
                error: err => {
                  this._snackBar.openSnackBar(err.msg);
                }
              })
          }
        },
        error: err => {
          this._snackBar.openSnackBar(err.msg);
        }
      })

  }

}
