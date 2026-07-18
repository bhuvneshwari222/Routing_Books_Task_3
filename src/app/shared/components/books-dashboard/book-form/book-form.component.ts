import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ibook } from 'src/app/shared/models/books';
import { BooksService } from 'src/app/shared/services/books.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  isInEditMode: boolean = false;
  bookForm !: FormGroup;
  bookId !: string;

  constructor(
    private _bookService: BooksService,
    private _snackBar: SnackbarService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.patchBookDetails()
  }

  createForm() {
    this.bookForm = new FormGroup({
      bookName: new FormControl(null, Validators.required),
      coverImage: new FormControl(null, Validators.required),
      bookStatus: new FormControl(null, Validators.required),
      isBestSeller: new FormControl(true),
      rating: new FormControl(null, [Validators.required, Validators.max(5)]),
      genre: new FormControl(null, Validators.required),
      publishYear: new FormControl(null, [Validators.required, Validators.pattern(/^\d{4}$/)]),
      description: new FormControl(null, Validators.required),
    })
  }

  get f() {
    return this.bookForm.controls;
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      return this.bookForm.markAllAsTouched()
    }
    let newBook: Ibook = { ...this.bookForm.getRawValue(), bookId: Date.now().toString() };
    this._bookService.addBook(newBook)
      .subscribe({
        next: resp => {
          this._snackBar.openSnackBar(resp.msg);
          this._router.navigate(['books']);
          this._bookService.setFirstBookSub$.next(true)
        },
        error: err => {
          this._snackBar.openSnackBar(err.msg);
        }
      })
  }

  patchBookDetails() {
    this.bookId = this._routes.snapshot.paramMap.get('bookID')!
    if (this.bookId) {
      this.isInEditMode = true;
      this._bookService.fetchBookById(this.bookId)
        .subscribe({
          next: resp => {
            this.bookForm.patchValue(resp);
          },
          error: err => {
            this._snackBar.openSnackBar(err.msg);
          }
        })
    }
  }

  onUpdateBook() {
    if (this.bookForm.invalid) {
      return this.bookForm.markAllAsTouched()
    }
    let updatedBook: Ibook = { ...this.bookForm.getRawValue(), bookId: this.bookId };
    this._bookService.updateBook(updatedBook)
      .subscribe({
        next: resp => {
          this._snackBar.openSnackBar(resp.msg);
          this._router.navigate(['books', this.bookId], {
            queryParams: {
              bookStatus: updatedBook.bookStatus
            }
          });
        },
        error: err => {
          this._snackBar.openSnackBar(err.msg);
        }
      })
  }

  canDeactivate(): boolean {
    if (this.bookForm.dirty && this.isInEditMode) {
      let getConfirmation = confirm(`Are you sure, you want to descard the changes?`);
      return getConfirmation;
    } else {
      return true;
    }
  }

}
